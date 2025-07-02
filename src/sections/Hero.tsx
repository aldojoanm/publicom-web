import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../styles/Hero.css'
import { useLocation } from 'react-router-dom'

export default function Hero() {
  const [showContent, setShowContent] = useState(false)
  const [showFloatingLogo, setShowFloatingLogo] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
      setShowFloatingLogo(false)
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (location.state?.scrollToHero) {
      const heroSection = document.getElementById('hero')
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth' })
      }
      window.history.replaceState({}, document.title)
    }
  }, [location])

  return (
    <section className="hero-wrapper" id="hero">
      <AnimatePresence>
        {!showContent && (
          <motion.div
            className="hero-video"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <video
              key="intro-video"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="hero-video-element"
            >
              <source src="/video/CamaraWeb.mp4" type="video/mp4" />
              Tu navegador no soporta video HTML5.
            </video>

            <AnimatePresence>
              {showFloatingLogo && (
                <motion.img
                  src="/logos/p-logo.png"
                  alt="Logo Publicom"
                  className="hero-floating-logo"
                  initial={{ scale: 0.3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 1.5 }}
                  draggable={false}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {showContent && (
        <motion.div
          className="hero-split"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <div className="hero-left">
            <motion.img
              src="/images/nuevohero.png"
              alt="Hombre grabando"
              className="hero-full-image"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.8 }}
            />
          </div>

          <div className="hero-right">
            <motion.img
              src="/logos/p-logo.png"
              alt="Logo Publicom"
              className="hero-logo"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              draggable={false}
            />

            <div className="hero-text-group">
              <div className="hero-line green">
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.3 }}
                >
                  PUBLICIDAD&nbsp;
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3, duration: 0.3 }}
                >
                  Y&nbsp;
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6, duration: 0.3 }}
                >
                </motion.span>
              </div>

              <motion.p
                className="hero-line white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0, duration: 0.4 }}
              >
                COMUNICACIÓN
              </motion.p>
            </div>

            <motion.a
              href="#quienes-somos"
              className="hero-cta-play-hover"
              aria-label="Conócenos"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.5, duration: 0.6 }}
            >
              <div className="play-wrapper">
                <svg
                  className="play-icon"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#003c3e"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7L8 5z" />
                </svg>
                <span className="play-text">Conócenos</span>
              </div>
            </motion.a>
          </div>
        </motion.div>
      )}
    </section>
  )
}
