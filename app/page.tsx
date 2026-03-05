import { getUser, getRepos, getEvents } from '@/lib/github'
import Nav from '@/components/Nav'
import Hero3D from '@/components/Hero3D'
import Marquee from '@/components/Marquee'
import About from '@/components/About'
import TechStack from '@/components/TechStack'
import Experience from '@/components/Experience'
import SampleWork from '@/components/SampleWork'
import Projects from '@/components/Projects'
import Activity from '@/components/Activity'
import CVDownload from '@/components/CVDownload'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export const revalidate = 3600

export default async function Home() {
  let user = null
  let repos: Awaited<ReturnType<typeof getRepos>> = []
  let events: Awaited<ReturnType<typeof getEvents>> = []

  try { user = await getUser() } catch {}
  try { repos = await getRepos() } catch {}
  try { events = await getEvents() } catch {}

  return (
    <main className="min-h-screen bg-[#F7F5F0] text-[#0A0A0A]">
      <Nav />
      <Hero3D user={user} />
      <Marquee />
      <About />
      <TechStack />
      <Experience />
      <SampleWork />
      <Projects repos={repos} />
      <Activity events={events} user={user} />
      <CVDownload />
      <Contact />
      <Footer />
    </main>
  )
}
