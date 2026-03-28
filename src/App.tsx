import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Navbar }          from './components/layout/Navbar'
import { Footer }          from './components/layout/Footer'
import { CustomCursor }    from './components/layout/CustomCursor'
import { SectionProgress } from './components/layout/SectionProgress'
import { LoadingSpinner } from './components/ui/LoadingSpinner'

const Home          = lazy(() => import('./pages/Home'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))

export default function App() {
  return (
    <>
      <CustomCursor />
      <SectionProgress />
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/"               element={<Home />} />
          <Route path="/projects/:id"   element={<ProjectDetail />} />
          <Route path="*"               element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}
