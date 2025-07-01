import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './sections/Hero'
import QuienesSomos from './sections/QuienesSomos'
import Vision from './sections/Vision'
import Productos from './sections/Productos'
import Servicios from './sections/Servicios'
import RedesSociales from './sections/RedesSociales'
import Eventos from './sections/Eventos'
import Clientes from './sections/Clientes'
import Contacto from './sections/Contacto'

import EcoRural from './pages/EcoRural'
import DigitalPlus from './pages/DigitalPlus'
import MegaPrint from './pages/MegaPrint'

import './index.css'


function Home() {
  return (
    <>
      <Header />
      <main>
        <section id="inicio"><Hero /></section>
        <QuienesSomos />
        <Vision />
        <Productos />
        <Servicios />
        <RedesSociales />
        <Eventos />
        <Clientes />
      </main>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ecorural" element={<EcoRural />} />
        <Route path="/digitalplus" element={<DigitalPlus />} />
        <Route path="/megaprint" element={<MegaPrint />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
