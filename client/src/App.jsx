/* eslint-disable no-unused-vars */
import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './components/HomePage/Home'
import Associations from './components/Associations/Associations'
import Sales from './components/Sales/Sales'
import Supply from './components/Supply/Supply'
import Predicting from './components/Predicting/Predicting'
import Future from './components/Future/Future'
import {Routes, Route, useLocation} from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Descriptive from './components/Descriptive/Descriptive'
import Predictive from './components/Predictive/Predictive'
import Maps from './components/Maps/Maps'


function App() {
  const location = useLocation();

  return (
    <div className="div-app">
      <Navbar />
      <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route index element={<Home />} />
        <Route path='/associations' element={<Associations />} />
        <Route path='/sales' element={<Sales />} />
        <Route path='/supply' element={<Supply />} />
        <Route path='/predicting' element={<Predicting />} />
        <Route path='/future' element={<Future />} />
        <Route path='/descriptive' element={<Descriptive />} />
        <Route path='/predictive' element={<Predictive />} />
        <Route path='/maps' element={<Maps />} />
      </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App
