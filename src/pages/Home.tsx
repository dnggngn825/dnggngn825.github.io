import { useEffect }  from 'react'
import { Hero }       from '../components/sections/Hero'
import { About }      from '../components/sections/About'
import { Experience } from '../components/sections/Experience'
import { Projects }   from '../components/sections/Projects'
import { Contact }    from '../components/sections/Contact'

export default function Home() {
  useEffect(() => {
    const savedY = sessionStorage.getItem('homeScrollY')
    if (savedY) {
      sessionStorage.removeItem('homeScrollY')
      requestAnimationFrame(() => window.scrollTo(0, parseInt(savedY, 10)))
    }
  }, [])

  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </main>
  )
}
