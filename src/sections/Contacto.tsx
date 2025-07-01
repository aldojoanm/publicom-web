import { useState } from 'react'
import { motion, easeInOut, easeOut } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Contacto.css'

type FormData = {
  nombre: string
  email: string
  mensaje: string
}

export default function Contacto() {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    mensaje: '',
  })

  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [enviado, setEnviado] = useState(false)
  const [loading, setLoading] = useState(false)

  // Hooks InView para cada campo
  const { ref: refNombre, inView: inViewNombre } = useInView({ triggerOnce: true, threshold: 0.3 })
  const { ref: refEmail, inView: inViewEmail } = useInView({ triggerOnce: true, threshold: 0.3 })
  const { ref: refMensaje, inView: inViewMensaje } = useInView({ triggerOnce: true, threshold: 0.3 })
  const { ref: refButton, inView: inViewButton } = useInView({ triggerOnce: true, threshold: 0.3 })

  const validarEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const validar = () => {
    const newErrors: Partial<FormData> = {}

    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio'
    if (!formData.email.trim()) newErrors.email = 'El correo es obligatorio'
    else if (!validarEmail(formData.email)) newErrors.email = 'Correo inválido'
    if (!formData.mensaje.trim()) newErrors.mensaje = 'El mensaje no puede estar vacío'

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: undefined })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validar()) return

    setLoading(true)
    setErrors({})
    setEnviado(false)

    await new Promise((r) => setTimeout(r, 1500))

    setLoading(false)
    setEnviado(true)
    setFormData({ nombre: '', email: '', mensaje: '' })
  }

  const inputVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: easeOut } },
  }

  const errorVariants = {
    initial: { x: 0 },
    animate: {
      x: [0, -6, 6, -6, 6, 0],
      transition: { duration: 0.4, ease: easeInOut },
    },
  }

  return (
    <section id="contacto">
      <h2>Contacto</h2>
      <form noValidate onSubmit={handleSubmit}>
        <motion.label
          ref={refNombre}
          htmlFor="nombre"
          variants={inputVariants}
          initial="hidden"
          animate={inViewNombre ? 'visible' : 'hidden'}
        >
          Nombre:
        </motion.label>
        <motion.input
          ref={refNombre}
          id="nombre"
          name="nombre"
          type="text"
          value={formData.nombre}
          onChange={handleChange}
          aria-invalid={!!errors.nombre}
          aria-describedby="error-nombre"
          disabled={loading}
          variants={inputVariants}
          initial="hidden"
          animate={inViewNombre ? 'visible' : 'hidden'}
          className={errors.nombre ? 'input-error' : ''}
          whileFocus={{ boxShadow: '0 0 8px 3px var(--verde-claro)' }}
        />
        {errors.nombre && (
          <motion.span
            id="error-nombre"
            className="error-text"
            variants={errorVariants}
            initial="initial"
            animate="animate"
            role="alert"
          >
            {errors.nombre}
          </motion.span>
        )}

        <motion.label
          ref={refEmail}
          htmlFor="email"
          variants={inputVariants}
          initial="hidden"
          animate={inViewEmail ? 'visible' : 'hidden'}
        >
          Correo electrónico:
        </motion.label>
        <motion.input
          ref={refEmail}
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          aria-describedby="error-email"
          disabled={loading}
          variants={inputVariants}
          initial="hidden"
          animate={inViewEmail ? 'visible' : 'hidden'}
          className={errors.email ? 'input-error' : ''}
          whileFocus={{ boxShadow: '0 0 8px 3px var(--verde-claro)' }}
        />
        {errors.email && (
          <motion.span
            id="error-email"
            className="error-text"
            variants={errorVariants}
            initial="initial"
            animate="animate"
            role="alert"
          >
            {errors.email}
          </motion.span>
        )}

        <motion.label
          ref={refMensaje}
          htmlFor="mensaje"
          variants={inputVariants}
          initial="hidden"
          animate={inViewMensaje ? 'visible' : 'hidden'}
        >
          Mensaje:
        </motion.label>
        <motion.textarea
          ref={refMensaje}
          id="mensaje"
          name="mensaje"
          rows={4}
          value={formData.mensaje}
          onChange={handleChange}
          aria-invalid={!!errors.mensaje}
          aria-describedby="error-mensaje"
          disabled={loading}
          variants={inputVariants}
          initial="hidden"
          animate={inViewMensaje ? 'visible' : 'hidden'}
          className={errors.mensaje ? 'input-error' : ''}
          whileFocus={{ boxShadow: '0 0 8px 3px var(--verde-claro)' }}
        />
        {errors.mensaje && (
          <motion.span
            id="error-mensaje"
            className="error-text"
            variants={errorVariants}
            initial="initial"
            animate="animate"
            role="alert"
          >
            {errors.mensaje}
          </motion.span>
        )}

        <motion.button
          ref={refButton}
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.07 }}
          whileTap={{ scale: loading ? 1 : 0.95 }}
          animate={{
            boxShadow: inViewButton
              ? loading
                ? '0 0 8px 4px var(--verde-claro)'
                : '0 0 0px 0px transparent'
              : '0 0 0 0 transparent',
          }}
          transition={{ duration: 1, repeat: Infinity, repeatType: 'mirror' }}
          aria-live="polite"
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </motion.button>

        {enviado && (
          <motion.p
            className="success-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: [0.8, 1] }}
            transition={{ delay: 0.2 }}
            role="alert"
          >
            ¡Mensaje enviado con éxito! Te responderemos pronto.
          </motion.p>
        )}
      </form>
    </section>
  )
}
