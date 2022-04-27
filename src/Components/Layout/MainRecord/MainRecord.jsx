import React from 'react'
import { HeaderRecord } from '../../Ui/HeadersRecord/HeaderRecord'
//import imgRegister from '../../../Image/imgRegister.png'

import { Record } from '../../Ui/Record/Record'
import './MainRecord.css'

export const MainRecord=() =>{
  return (
    <div className='mainRecord'>
      <div className='header'>
        <HeaderRecord/>
      </div>
      <div className='record' >
        <Record/>
      </div>   
    </div>
  )
}
