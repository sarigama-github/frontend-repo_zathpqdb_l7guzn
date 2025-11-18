import { useEffect, useState } from 'react'
import Splash from './components/Splash'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'

function App() {
  const [ready, setReady] = useState(false)
  const [session, setSession] = useState(null)

  useEffect(() => {
    // show splash then continue
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50">
      {!ready && <Splash onDone={() => setReady(true)} />}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white shadow flex items-center justify-center">🧠</div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-orange-600">Digital Literacy</h1>
              <p className="text-orange-700/70 text-sm">A playful learning world for ages 5–8</p>
            </div>
          </div>
          <div className="rounded-2xl px-3 py-2 bg-white/70 border-2 border-orange-200 text-sm">ID/EN</div>
        </header>

        {!session ? (
          <Auth onContinue={setSession} />
        ) : (
          <Dashboard child={session.child} view={session.view} />
        )}
      </div>
    </div>
  )
}

export default App