import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Room from './pages/Room';
import { AuthProvider } from './utils/authContext';
import PrivateRoutes from './utils/privateRoutes';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';





const App = () => {


  return (

    <Router>
      <AuthProvider>
        <Routes>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Room />} />
          </Route>

        </Routes>
      </AuthProvider>
    </Router>

  )
}

export default App
