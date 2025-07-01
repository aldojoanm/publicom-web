import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Lottie from 'lottie-react'
import redAnimation from '@/assets/Lottie/Red.json' // Ajusta la ruta según tu proyecto
import './QuienesSomos.css'

function TypeWriter({ text, inView, onDone }: { text: string; inView: boolean; onDone: () => void }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!inView || done) {
      if (!inView) {
        setDisplayed('')
        setDone(false)
      }
      return
    }

    let currentIndex = 0
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, currentIndex + 1))
      currentIndex++
      if (currentIndex === text.length) {
        clearInterval(interval)
        setDone(true)
        onDone()
      }
    }, 75)

    return () => clearInterval(interval)
  }, [inView, text, done, onDone])

  const firstSpaceIndex = text.indexOf(' ')
  const firstWordDisplayed = displayed.slice(0, firstSpaceIndex)
  const restDisplayed = displayed.slice(firstSpaceIndex)

  return (
    <h2 className="qs-title" id="quienes-title">
      <span className="verde">{firstWordDisplayed}</span>
      <span className="gris">{restDisplayed}</span>
      <span className="cursor" style={{ opacity: inView && displayed.length < text.length ? 1 : 0 }} />
    </h2>
  )
}

export default function Quienes() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })
  const [textDone, setTextDone] = useState(false)

  return (
    <motion.div
      className="qs-container"
      id="quienes-somos"
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="qs-left">
        <TypeWriter
          key="qs-title"
          text="¿Quiénes SOMOS?"
          inView={inView}
          onDone={() => setTextDone(true)}
        />

        <AnimatePresence>
          {inView && (
            <motion.p
              className="qs-text"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
            >
              PUBLICOM es una agencia boliviana con más de 20 años de trayectoria consolidada en comunicación digital,
              campañas publicitarias, producción audiovisual, diseño gráfico y eventos corporativos.<br /><br />
              Nos enfocamos en soluciones estratégicas y multicanal adaptadas a las necesidades de cada cliente.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {textDone && (
          <motion.div
            className="qs-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div
              style={{
                transform: 'scale(1.8)',
                transformOrigin: 'center',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Lottie animationData={redAnimation} loop={true} style={{ width: '100%', maxWidth: '500px' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Línea divisoria absoluta al final */}
      <div className="qs-divider" />
    </motion.div>
  )
}
