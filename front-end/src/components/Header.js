import React from 'react'
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';


const Header = () => {

  const [cookies,removeCookie] = useCookies(['uuid']);
  const userLoggedIn = cookies['uuid'];

  const handleLogout = () => {
    // Remove the 'uuid' cookie
    removeCookie('uuid');
  
  }

  return (
    <div className='header'>
        <h1>Tableau de bord</h1>
        <button className='logout-button' onClick={handleLogout}><Link to="/" >Déconnexion </Link></button>
    </div>
  )
}

export default Header
