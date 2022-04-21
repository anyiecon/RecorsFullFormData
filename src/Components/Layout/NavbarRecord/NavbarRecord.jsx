import React from 'react'
import './NavbarRecord.css'
import logo from '../../../Image/logo.png'
import logotypeFMarket from '../../../Image/logotypeFMarket.png'

export const NavbarRecord=() =>{
  return (
    <div className='navbarRecord'>
        <img className="logo" src={logo} ></img>
        <img className='logotypeFMarket' src={logotypeFMarket} ></img>
    </div>
  )
}
