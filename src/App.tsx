import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import WorkflowSection from '@/components/WorkflowSection'
import CreateIdPage from '@/pages/CreateIdPage'
import GeneratingPage from '@/pages/GeneratingPage'
import CardResultPage from '@/pages/CardResultPage'
import PublicIdPage from '@/pages/PublicIdPage'
import BuilderPassPage from '@/pages/BuilderPassPage'

function useRoute() {
  const [path, setPath] = useState(() => window.location.pathname)

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = useCallback((nextPath: string) => {
    window.history.pushState({}, '', nextPath)
    setPath(nextPath)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return { path, navigate }
}

function LandingPage() {
  return (
    <>
      <HeroSection>
        <Navbar />
      </HeroSection>
      <WorkflowSection />
    </>
  )
}

export default function App() {
  const { path, navigate } = useRoute()
  const page = useMemo(() => {
    if (path === '/') return <LandingPage />
    if (path === '/create-id') return <CreateIdPage navigate={navigate} />
    if (path === '/generating') return <GeneratingPage navigate={navigate} />

    const matchIdCard = path.match(/^\/id-card\/(HH\d{8})$/)
    if (matchIdCard) return <CardResultPage id={matchIdCard[1]} navigate={navigate} />

    const matchPublic = path.match(/^\/id\/(HH\d{8})$/)
    if (matchPublic) return <PublicIdPage id={matchPublic[1]} navigate={navigate} />

    const match = path.match(/^\/builder-pass\/(HH\d{8})$/)
    if (match) return <BuilderPassPage id={match[1]} navigate={navigate} />

    return <LandingPage />
  }, [path, navigate])

  if (path === '/') return page

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={path}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.22 }}
      >
        {page}
      </motion.div>
    </AnimatePresence>
  )
}
