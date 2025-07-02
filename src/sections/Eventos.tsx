// Eventos.tsx

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { FaMicrophoneAlt, FaUsers, FaBullhorn, FaCalendarAlt } from 'react-icons/fa';
import './Eventos.css';

const eventosData = [
  {
    icono: <FaMicrophoneAlt size={48} color="#a2ce39" />,
    titulo: 'Conferencias',
    descripcion: 'Organizamos conferencias profesionales para potenciar el conocimiento y networking.',
  },
  {
    icono: <FaUsers size={48} color="#a2ce39" />,
    titulo: 'Seminarios y Simposios',
    descripcion: 'Eventos académicos y profesionales con expertos y líderes de la industria.',
  },
  {
    icono: <FaBullhorn size={48} color="#a2ce39" />,
    titulo: 'Ferias',
    descripcion: 'Exhibiciones comerciales para presentar productos y servicios a gran escala.',
  },
  {
    icono: <FaCalendarAlt size={48} color="#a2ce39" />,
    titulo: 'Presentaciones de Productos',
    descripcion: 'Lanzamientos impactantes y profesionales para nuevas propuestas de mercado.',
  },
];
type EventoProps = {
  icono: React.ReactNode;
  titulo: string;
  descripcion: string;
};

function BloqueEvento({ icono, titulo, descripcion }: EventoProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });

  return (
    <motion.div
      ref={ref}
      className="bloque-evento"
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(162,206,57,0.4)', cursor: 'pointer' }}
    >
      <motion.div
        className="icono-evento"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1, rotate: 360 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {icono}
      </motion.div>
      <motion.div
        className="contenido-evento"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
      >
        <h3>{titulo}</h3>
        <p>{descripcion}</p>
      </motion.div>
    </motion.div>
  );
}

export default function Eventos() {
  return (
    <section id="eventos" className="eventos-container">
      <motion.h2
        className="eventos-title"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        EVENTOS
      </motion.h2>
      <motion.p
        className="eventos-subtitulo"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Realizamos todo tipo de eventos corporativos y profesionales.
      </motion.p>

      <div className="eventos-lista">
        {eventosData.map((evento, idx) => (
          <BloqueEvento key={idx} {...evento} />
        ))}
      </div>
    </section>
  );
}
