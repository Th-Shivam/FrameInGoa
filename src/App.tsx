import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import WorkflowSection from '@/components/WorkflowSection'

export default function App() {
  return (
    <>
      <HeroSection>
        <Navbar />
      </HeroSection>
      <WorkflowSection />
    </>
  )
}
