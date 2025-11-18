import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Dashboard({ child, view='child' }) {
  const [lessons, setLessons] = useState([])
  const [games, setGames] = useState([])
  const [missions, setMissions] = useState([])
  const [rec, setRec] = useState(null)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const load = async () => {
      try {
        await fetch(`${baseUrl}/seed`, { method: 'POST' })
      } catch {}
      const [ls, gs, ms] = await Promise.all([
        fetch(`${baseUrl}/lessons`).then(r=>r.json()),
        fetch(`${baseUrl}/games`).then(r=>r.json()),
        fetch(`${baseUrl}/missions`).then(r=>r.json()),
      ])
      setLessons(ls); setGames(gs); setMissions(ms)
      if (child?.id) {
        const recRes = await fetch(`${baseUrl}/recommendations/${child.id}`).then(r=>r.json())
        setRec(recRes)
      }
    }
    load()
  }, [child, baseUrl])

  const Card = ({ title, emoji, desc, onClick }) => (
    <button onClick={onClick} className="text-left rounded-3xl p-5 bg-white shadow-lg hover:shadow-xl transition-all border-2 border-orange-200">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{emoji}</span>
        <div>
          <h3 className="text-lg font-extrabold text-orange-700">{title}</h3>
          {desc && <p className="text-sm text-orange-800/70">{desc}</p>}
        </div>
      </div>
    </button>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-orange-700">Hello, {child?.name || 'Explorer'}! ✨</h2>
          <p className="text-orange-800/70">Let's learn and play today.</p>
        </div>
        <div className="rounded-2xl px-4 py-2 bg-gradient-to-r from-orange-400 to-pink-400 text-white font-bold shadow">⭐ {child?.stars || 0} • 🧡 {child?.points || 0} • Lv {child?.level || 1}</div>
      </div>

      {rec && rec.title && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-3xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-orange-200">
          <p className="text-orange-800"><span className="font-bold">Today's pick:</span> {rec.title} <span className="text-orange-700/70">— {rec.reason}</span></p>
        </motion.div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <Card title="Digital Literacy Learning" emoji="📚" desc="Fun lessons for kids" />
        <Card title="Educational Games" emoji="🕹️" desc="Play to learn" />
        <Card title="Explore Missions" emoji="🧭" desc="Daily and weekly goals" />
        <Card title="My Achievements" emoji="🏆" desc="Badges and progress" />
      </div>

      {view !== 'child' && (
        <div className="mt-8 p-5 rounded-3xl bg-white border-2 border-orange-200 shadow">
          <h3 className="text-xl font-extrabold text-orange-700 mb-2">Parent/Teacher Overview</h3>
          <p className="text-orange-800/80">Quick snapshot of recent scores and recommendations.</p>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-3xl bg-white border-2 border-orange-200 p-4">
          <h4 className="font-bold text-orange-700 mb-2">Lessons</h4>
          <ul className="space-y-2">
            {lessons.map(l => (
              <li key={l.id} className="flex items-center justify-between">
                <span>📗 {l.title}</span>
                <button className="px-3 py-1 rounded-xl bg-orange-500 text-white text-sm">Start</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-white border-2 border-orange-200 p-4">
          <h4 className="font-bold text-orange-700 mb-2">Games</h4>
          <ul className="space-y-2">
            {games.map(g => (
              <li key={g.id} className="flex items-center justify-between">
                <span>🎮 {g.title}</span>
                <button className="px-3 py-1 rounded-xl bg-pink-500 text-white text-sm">Play</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-white border-2 border-orange-200 p-4">
          <h4 className="font-bold text-orange-700 mb-2">Missions</h4>
          <ul className="space-y-2">
            {missions.map(m => (
              <li key={m.id} className="flex items-center justify-between">
                <span>🧭 {m.title}</span>
                <button className="px-3 py-1 rounded-xl bg-amber-500 text-white text-sm">Track</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
