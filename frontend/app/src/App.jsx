import { useState } from 'react'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { ChakraProvider } from '@chakra-ui/react';

import Login from './routes/login';
import Menu from './routes/menu';

function App() {

  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Menu />} />
        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App
