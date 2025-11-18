import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Auth({ onContinue }) {
  const [mode, setMode] = useState('child')
  const [name, setName] = useState('')
  const [age, setAge] = useState(6)
  const [loading, setLoading] = useState(false)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleGuest = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/children`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Guest Explorer', age: 6, mode: 'guest' })
      })
      const data = await res.json()
      onContinue({ child: { id: data.id, ...data.child }, view: 'child' })
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    if (!name) return
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/children`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, age: Number(age), mode })
      })
      const data = await res.json()
      onContinue({ child: { id: data.id, ...data.child }, view: mode === 'teacher' ? 'teacher' : 'child' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[60vh] bg-white/70 backdrop-blur rounded-3xl p-6 md:p-8 shadow-xl">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-orange-600">Sign In / Sign Up</h2>
        <p className="text-orange-700/80">Create a child profile or explore as guest</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="block text-orange-800 font-semibold">Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Adit" className="w-full px-4 py-3 rounded-2xl border-2 border-orange-200 focus:border-orange-400 outline-none bg-white" />
          <label className="block text-orange-800 font-semibold">Age</label>
          <input type="number" value={age} min={5} max={8} onChange={e=>setAge(e.target.value)} className="w-full px-4 py-3 rounded-2xl border-2 border-orange-200 focus:border-orange-400 outline-none bg-white" />
          <label className="block text-orange-800 font-semibold">Mode</label>
          <select value={mode} onChange={e=>setMode(e.target.value)} className="w-full px-4 py-3 rounded-2xl border-2 border-orange-200 focus:border-orange-400 outline-none bg-white">
            <option value="child">Parent Mode (create child)</option>
            <option value="teacher">Teacher Mode</option>
          </select>
        </div>
        <div className="flex flex-col justify-between">
          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="p-4 rounded-2xl bg-gradient-to-br from-orange-50 to-pink-50 border border-orange-200">
            <p className="text-orange-800"><span className="font-bold">Guest Mode:</span> Try the app quickly without saving data.</p>
          </motion.div>
          <div className="grid grid-cols-1 gap-3 mt-4">
            <button onClick={handleCreate} disabled={loading} className="px-4 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold disabled:opacity-60">Start</button>
            <button onClick={handleGuest} disabled={loading} className="px-4 py-3 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-bold disabled:opacity-60">Continue as Guest</button>
          </div>
        </div>
      </div>
    </div>
  )
}
