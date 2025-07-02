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
  hidden: { opacity: 0, y: 50, scale: 0.85 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

export default function Clientes() {
  return (
    <section id="clientes" className="clientes-section">
      <h2 className="clientes-title">
        Clientes que confían en <span className="highlight">PUBLICOM</span>
      </h2>
      <motion.div 
        className="clientes-logos"
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
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
              whileHover={{ scale: 1.1, y: -5, filter: 'grayscale(0%) drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}
              whileFocus={{ scale: 1.1, y: -5, filter: 'grayscale(0%) drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}
              tabIndex={0}
            />
          )
        })}
      </motion.div>
    </section>
  )
}
