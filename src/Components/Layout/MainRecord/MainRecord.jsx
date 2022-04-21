import React from 'react'
import { HeaderRecord } from '../../Ui/HeadersRecord/HeaderRecord'
import { Record } from '../../Ui/Record/Record'
import './MainRecord.css'

export const MainRecord=() =>{
  return (
    <div className='mainRecord'>
        <HeaderRecord/>
        <Record/>
    </div>
  )
}
