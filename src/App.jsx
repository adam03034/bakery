import { Suspense } from 'react'
import Presentation from './components/Presentation'

function App() {
  try {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <Suspense fallback={<div>Loading...</div>}>
          <Presentation />
        </Suspense>
      </div>
    )
  } catch (error) {
    console.error('Error in App component:', error)
    return <div>Something went wrong. Check console for details.</div>
  }
}

export default App