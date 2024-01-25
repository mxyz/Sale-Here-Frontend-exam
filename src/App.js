
import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';

import Home from './pages/home'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;
