import type { BuilderPassData } from '@/types/builderPass'

const DB_NAME = 'builder-pass-store'
const STORE_NAME = 'passes'
const GENERATED_CARDS_STORE = 'generated-cards'
const DB_VERSION = 2

function openPassDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
      if (!db.objectStoreNames.contains(GENERATED_CARDS_STORE)) {
        db.createObjectStore(GENERATED_CARDS_STORE, { keyPath: 'id' })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
    request.onblocked = () => reject(new Error('IndexedDB blocked'))
  })
}

async function idbGet(id: string): Promise<BuilderPassData | null> {
  try {
    const db = await openPassDb()
    const pass = await new Promise<BuilderPassData | undefined>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly')
      const request = tx.objectStore(STORE_NAME).get(id)
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
    db.close()
    return pass ?? null
  } catch {
    return null
  }
}

async function idbPut(pass: BuilderPassData): Promise<boolean> {
  try {
    const db = await openPassDb()
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite')
      tx.objectStore(STORE_NAME).put(pass)
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
      tx.onabort = () => reject(tx.error)
    })
    db.close()
    return true
  } catch {
    return false
  }
}

export async function saveBuilderPass(pass: BuilderPassData): Promise<void> {
  // IndexedDB only. The pass record contains the photo as a base64 data URL,
  // which is hundreds of KB to several MB — way past the localStorage quota.
  // We must NOT fall back to localStorage as that would re-introduce the
  // QuotaExceededError this storage layer was rewritten to avoid.
  const persisted = await idbPut(pass)
  if (!persisted) {
    throw new Error('Unable to save Builder Pass — IndexedDB is unavailable in this browser.')
  }
}

export async function getBuilderPass(id: string): Promise<BuilderPassData | null> {
  return idbGet(id)
}

async function idbPutGeneratedCard(id: string, dataUrl: string): Promise<boolean> {
  try {
    const db = await openPassDb()
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(GENERATED_CARDS_STORE, 'readwrite')
      tx.objectStore(GENERATED_CARDS_STORE).put({ id, dataUrl })
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
      tx.onabort = () => reject(tx.error)
    })
    db.close()
    return true
  } catch {
    return false
  }
}

async function idbGetGeneratedCard(id: string): Promise<string | null> {
  try {
    const db = await openPassDb()
    const record = await new Promise<{ id: string; dataUrl: string } | undefined>((resolve, reject) => {
      const tx = db.transaction(GENERATED_CARDS_STORE, 'readonly')
      const request = tx.objectStore(GENERATED_CARDS_STORE).get(id)
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
    db.close()
    return record?.dataUrl ?? null
  } catch {
    return null
  }
}

export async function saveGeneratedCard(id: string, dataUrl: string): Promise<void> {
  // IndexedDB only. The rendered PNG dataURL is hundreds of KB to a few MB
  // — large enough to overflow sessionStorage (≈5 MB cap shared across the
  // whole tab) and definitely large enough to compete with the pending-form
  // photo we used to (mistakenly) put there. IndexedDB has no such cap.
  const persisted = await idbPutGeneratedCard(id, dataUrl)
  if (!persisted) {
    throw new Error('Unable to cache generated card — IndexedDB is unavailable in this browser.')
  }
}

export async function getGeneratedCard(id: string): Promise<string | null> {
  return idbGetGeneratedCard(id)
}