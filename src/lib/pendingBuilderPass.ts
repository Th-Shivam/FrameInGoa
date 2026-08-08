// Module-level in-memory cache for the pending builder pass being generated.
//
// Rationale: the uploaded photo is a base64 data URL that easily exceeds the
// 5 MB localStorage / sessionStorage quota. We must not serialize it into any
// Web Storage API. The photo and the rest of the form payload live in this
// plain JavaScript object for the duration of the current page session — they
// survive React-tree changes (route transitions in our custom router) but are
// cleared on page reload, which is the expected behavior for a one-shot
// generation flow. The persistable record (id, name, role, photo) is written
// to IndexedDB by GeneratingPage only after Builder ID generation completes.

import type { BuilderPassInput } from '@/types/builderPass'

let pending: BuilderPassInput | null = null

export function setPendingBuilderPass(input: BuilderPassInput): void {
  pending = input
}

export function getPendingBuilderPass(): BuilderPassInput | null {
  return pending
}

export function clearPendingBuilderPass(): void {
  pending = null
}
