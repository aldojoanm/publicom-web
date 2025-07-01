import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Clientes.css'

const clientes = [
  'greenfield-logo.png', 'greenfield-logo.png', 'greenfield-logo.png',
  'greenfield-logo.png', 'greenfield-logo.png', 'greenfield-logo.png',
  'greenfield-logo.png', 'greenfield-logo.png', 'greenfield-logo.png',
  'greenfield-logo.png', 'greenfield-logo.png', 'greenfield-logo.png',
  'greenfield-logo.png', 'greenfield-logo.png', 'greenfield-logo.png',
]

const animationVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

export default function Clientes() {
  return (
    <section id="clientes" className="clientes-section">
      <h2 className="clientes-title">Clientes que confían en PUBLICOM</h2>
      <div className="clientes-logos">
        {clientes.map((logo, i) => {
          const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

          return (
            <motion.img
              key={i}
              ref={ref}
              src={`/logos/${logo}`}
              alt={`Logo cliente ${i + 1}`}
              className="clientes-logo"
              loading="lazy"
              variants={animationVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.1 }}
              whileHover={{ scale: 1.08 }}
              whileFocus={{ scale: 1.08 }}
              tabIndex={0}
            />
          )
        })}
      </div>
    </section>
  )
}
