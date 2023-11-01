/* eslint-disable no-unused-vars */
import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './components/HomePage/Home'
import Associations from './components/Associations/Associations'
import {Routes, Route, useLocation} from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

function App() {
  const location = useLocation();

  return (
    <div className="div-app">
      <Navbar />
      <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route index element={<Home />} />
        <Route path='/associations' element={<Associations />} />
      </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App
