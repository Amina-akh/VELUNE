import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Collection } from './components/Collection'
import { AIAtelier } from './components/AIAtelier'
import { Marquee } from './components/Marquee'
import { Manifest } from './components/Manifest'
import { HowItWorks } from './components/HowItWorks'
import { FAQ } from './components/FAQ'
import { Footer } from './components/Footer'
import { OrderForm } from './components/OrderForm'
import { GridBg } from './components/GridBg'
import { StickyBar } from './components/StickyBar'
import './components/GridBg.css'
import './components/Marquee.css'
import './components/Manifest.css'
import './App.css'

export default function App() {
  const [showOrder, setShowOrder] = useState(false)

  useEffect(() => {
    if (showOrder) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [showOrder])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showOrder) setShowOrder(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showOrder])

  const openOrder = () => setShowOrder(true)
  const closeOrder = () => setShowOrder(false)

  return (
    <div className="app">
      <GridBg />
      <Header onOrderClick={openOrder} />
      <main className="main">
        <Hero onOrderClick={openOrder} />
        <Marquee />
        <Collection onOrderClick={openOrder} />
        <AIAtelier />
        <Manifest />
        <HowItWorks />
        <FAQ />
      </main>
      <Footer onOrderClick={openOrder} />
      <StickyBar onOrderClick={openOrder} />
      {showOrder && <OrderForm onClose={closeOrder} />}
    </div>
  )
}
