import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './views/Home.jsx'
import Login from './views/auth/login.jsx'
import Register from './views/auth/register.jsx';
import Dashboard from './views/operator/dashboard.jsx';
import Statistics from './views/operator/statistiques.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/operator' element={<Dashboard />}/>
        <Route path='/statistics' element={<Statistics />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
