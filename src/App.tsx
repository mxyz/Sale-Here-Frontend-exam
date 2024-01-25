
import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';

import Home from './pages/home'
import images from './assets/images';

const App = () => {
  return (

    <main className="w-full h-full" style={{
      backgroundImage: `url(${images.bg})`
    }}>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
    </main>
  )
};

export default App;
