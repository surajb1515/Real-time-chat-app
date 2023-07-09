import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './authContext'


const PrivateRoutes = () => {

  // TAKING OUR user FROM THE CONTEXT API WHICH WE HAVE MADE
  const { user } = useAuth()

  // An <Outlet> should be used in parent route elements to render their child route elements.


  return (
    <>
      {user ? <Outlet /> : <Navigate to="/login" />}
    </>
  )
}

export default PrivateRoutes
