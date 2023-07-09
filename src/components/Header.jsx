import React from 'react'
import { Link } from 'react-router-dom'
import { LogOut, LogIn } from 'react-feather'
import { useAuth } from '../utils/authContext'

const Header = () => {
  const { user, handleLogout } = useAuth()
  return (
    <div id="header--wrapper">
      {user ? (
        <>
          Welcome {user.name}
          <LogOut className="header--link" onClick={handleLogout} />
        </>
      ) : (
        <>
          <Link to="/">
            <LogIn className="header--link" />
          </Link>
        </>
      )}
    </div>
  )
}

export default Header
