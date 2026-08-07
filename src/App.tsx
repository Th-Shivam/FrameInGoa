import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import WorkflowSection from '@/components/WorkflowSection'
import IDCardGenerator from '@/components/IDCardGenerator'

export default function App() {
  return (
    <>
      <HeroSection>
        <Navbar />
      </HeroSection>
      <WorkflowSection />
      <IDCardGenerator />
    </>
  )
}
