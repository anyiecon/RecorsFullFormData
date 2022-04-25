import React from 'react'
import { MainRecord } from '../Layout/MainRecord/MainRecord'
import { NavbarRecord } from '../Layout/NavbarRecord/NavbarRecord'
import './HomeRecord.css'
export const HomeRecord=()=> {
  return (
    <div>
        <NavbarRecord/>
        <div className='line'></div>
        <MainRecord/>
        <div className='line'></div>
    </div>
  )
}
