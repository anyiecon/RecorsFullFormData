import React from 'react'
import imgRegister from '../../../Image/imgRegister.png'
import { Record } from '../../Ui/Record/Record'
import './MainRecord.css'

export const MainRecord=() =>{
  return (
    <div className='mainRecord'>
      <img className='imgRecord' src={imgRegister} alt=""></img>
       <div className='res'>
         <Record/>
       </div>
        
    </div>
  )
}
