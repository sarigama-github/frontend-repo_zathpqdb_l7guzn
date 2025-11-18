import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Spline from '@splinetool/react-spline'

export default function Splash({ onDone }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setShow(false)
      setTimeout(() => onDone && onDone(), 600)
    }, 2200)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 bg-gradient-to-br from-amber-100 via-orange-100 to-pink-100 flex items-center justify-center"
        >
          <div className="absolute inset-0 pointer-events-none">
            <Spline scene="https://prod.spline.design/95Gu7tsx2K-0F3oi/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          </div>
          <div className="relative text-center px-6">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} className="mx-auto mb-6 w-28 h-28 rounded-3xl bg-white/70 backdrop-blur-sm shadow-xl flex items-center justify-center">
              <span className="text-4xl">🧩</span>
            </motion.div>
            <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-3xl md:text-4xl font-extrabold text-orange-600">
              Gamified Digital Literacy
            </motion.h1>
            <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35, duration: 0.6 }} className="mt-2 text-orange-700/80">
              Learn, play, and earn stars!
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-6 flex items-center justify-center gap-2 text-orange-700/70">
              <span className="animate-pulse">✦</span>
              <span className="animate-pulse delay-150">✦</span>
              <span className="animate-pulse delay-300">✦</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
