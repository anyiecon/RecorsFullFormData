import {React, useState, useEffect} from 'react'
import axios from 'axios';
import './Record.css'

export const Record=()=> {
  const [name, setName] = useState("");
  const [alias, setAlias] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState();

  //State Character
  const[msgEmail, setMsgEmail]=useState("")
  const[msgName, setMsgName]=useState("")
  const[msgAlias, setMsgAlias]=useState("")
  const[msgPassword, setMsgPassword]=useState("")
  const[msgPhone, setMsgPhone]=useState("")

  var formData = new FormData();

const HandleSubmit= async (e)=>{
  formData.append("name", name)
  formData.append("alias", alias)
  formData.append("email", email)
  formData.append("password", password)
  formData.append("department", department)
  formData.append("municipality", municipality)
  formData.append("address", address)
  formData.append("phone", phone)
  formData.append("photo", photo)  
  
  console.log(formData);
  axios.post('https://backend-fullmarket-py.herokuapp.com/createuser', formData).then((res => {
    console.log(res);
  })).catch((err => {
    console.log(err);
  }))
  e.preventDefault()
}
const handleCharacterEmail =()=>{
    let validationEmail =/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    let parrafo
    if(email.match(validationEmail)){
      parrafo="Información valida"
      setMsgEmail(parrafo)
    }else{
      parrafo="Información incorrecta, por favor verifiquela"
      setMsgEmail(parrafo)
    }
}
const handleCharacterName=()=>{
  let validationName= /^[A-Za-z]{3,16}$/
  let parrafo
  if(name.match(validationName)){
    parrafo="Información correcta"
    setMsgName(parrafo)
  }else{
    parrafo="Información incorrecta, Solo puedes añadir letras, minimo 3 letras maximo 16 letras"
    setMsgName(parrafo)
  }
}
const handleCharacterAlias=()=>{
  let validationAlias= /^[A-Za-z]{3,10}$/
  let parrafo
  if(alias.match(validationAlias)){
    parrafo="Información correcta"
    setMsgAlias(parrafo)
  }else{
    parrafo="Información incorrecta, Solo puedes añadir letras, minimo 3 letras maximo 10 letras"
    setMsgAlias(parrafo)
  }
}
const handleCharacterPassword=()=>{
  let validationPassword= /^[a-z0-9_-]{6,18}$/
  let parrafo
  if(password.match(validationPassword)){
    parrafo="Información correcta"
    setMsgPassword(parrafo)
  }else{
    parrafo="Información incorrecta, desbes añadir letras y numeros, su contraseña debe ser minimo de 7 letras,maximo 10 letras"
    setMsgPassword(parrafo)
  }
}
const handleCharacterPhone=()=>{
  let validationPhone= /^[0-9]{7,12}$/
  let parrafo
  if(phone.match(validationPhone)){
    parrafo="Información correcta"
    setMsgPhone(parrafo)
  }else{
    parrafo="Información incorrecta, desbes añadir solo numeros, su numero de telefono debe ser minimo de 7 numeros, maximo 10 numeros"
    setMsgPhone(parrafo)
  }
}

const url = 'https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json'
  const [Depart , setDepart] = useState()
  const fetchApi = async () => {
    const responde = await fetch(url)
    const responseDepart = await responde.json()
    setDepart(responseDepart)
  }
  useEffect(() => {
    fetchApi()})
//VALIDACIÓN DE CARACTERES Y CHECK
   const [terminos , cambiarTerminos]=useState(false);
 
   const handleTerminos=(e)=>{
     cambiarTerminos(e.target.checked)
     if(terminos == false){
       console.log("Registro completo");
     }
     else{
       console.log("Debes aceptar los termino y condiciones para  lpoder registrate");
       
     }
   }
  

  return (
    <form onSubmit={HandleSubmit} className="record" >
      <p>RECORD USERS</p>
      <div className='files'>
        <div className='filesOne'>  
          
          <input type="name" name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='enter your name' onKeyUp={handleCharacterName}></input>
          <p className='alertIcorrect'>{msgName}</p>
          <input type="alias" name='alias' value={alias} onChange={(e) => setAlias(e.target.value)} placeholder='enter your alias' onKeyUp={handleCharacterAlias} ></input>
          <p className='alertIcorrect'>{msgAlias}</p>
          <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter your email' onKeyUp={handleCharacterEmail} ></input>
          <p className='alertIcorrect'>{msgEmail}</p>
          <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='enter your password' onKeyUp={handleCharacterPassword}></input>
          <p className='alertIcorrect'>{msgPassword}</p>
        </div>
        <div className='filesTwo'>
          <select className='selectDepart' type="department" name='department' value={department} onChange={(e) => setDepartment(e.target.value)} placeholder='enter your departament'>
                { !Depart ? 'Cargando...'  :
                    Depart.map((Depart,index) => {
                      return <option key={index} value={Depart.departamento}>{Depart.departamento} </option>
                    })
                  }        
          </select>
          <select  className='selectMuni' type="municipality" name='municipality' value={municipality} onChange={(e) => setMunicipality(e.target.value)} placeholder='enter your municipality'>
                { !Depart ? 'Cargando...' :
                  Depart.map((Depart,index) => {
                    return <option key={index} value={Depart.ciudades}>{Depart.ciudades} </option>
                  })}
          </select>
          <input type="address" name='address' value={address} onChange={(e) => setAddress(e.target.value)} placeholder='enter your address'></input>
          <input type="phone" name='phone' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='entert your phone' onKeyUp={handleCharacterPhone}></input>
          <p className='alertIcorrect'>{msgPhone}</p>
          <input type="file" name='photo' onChange={(e) => setPhoto(e.target.files[0])} placeholder='enter your profile picture'></input> 
        </div>
      </div>
      <label><input type="checkbox" name='terminos' id='terminos' checked={terminos} onClick={handleTerminos}></input>Al hacer click en "REGISTRARSE", Acepta Nuestras Condiciones, la politica de datos y la politica de cookies.</label> 

       <button type="submit" >Registrarse</button>
    </form>
  )
}

