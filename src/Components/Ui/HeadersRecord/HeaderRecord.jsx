import React from 'react'
import imgRegister from '../../../Image/imgRegister.png'
import './HeaderRecord.css'
export const HeaderRecord=()=> {
  return (
        <div className='recorRe'>
            <div className='recordText'>
            <h1 className='textRecor'>REGISTRATE AQUÍ</h1>
            </div>
            <img className='imgRecord' src={imgRegister} alt=""></img>
            <div className='recordTexts'>
            <p className='textRecord'>REGISTRATE AQUÍ TOTALMENTE GRATIS PARA UNA EXCELENTE EXPERIENCIA</p>
            </div>
        </div>
  )
}
