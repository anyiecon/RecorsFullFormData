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

  //State Check
  const [terminos, cambiarTerminos] = useState(false);
  const [msgCheck, setMsgCheck] = useState();

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
    let validationAlias= /^[A-Za-z0-9]{3,10}$/
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
      parrafo ="Información incorrecta, desbes añadir letras y numeros, su contraseña debe ser minimo de 7 letras y/o numeros,maximo 10 letras  y/o numeros"
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


//VALIDACIÓN DE CHECK
   const handleTerminos=(e)=>{
     cambiarTerminos(e.target.checked)
     let parrafo
     if(terminos === false){
       console.log("Registro completo");
       parrafo="Registro completo"
       setMsgCheck(parrafo)
     }
     else{
       parrafo="Debes aceptar los termino y condiciones para  lpoder registrate"
       setMsgCheck(parrafo)
       
     }
   }

//Clasificador de municipios por departemento 
const [Depart, setDepart] = useState()
const [City, setCity] = useState()

// Apis que retornan datos departamentales y municipales
const url = 'https://colombia-2272c-default-rtdb.firebaseio.com/departaments.json'
const ur = 'https://colombia-2272c-default-rtdb.firebaseio.com/cities.json'

//Respuesta y declaracion de APIS
const fetchApi = async () => {
  const responde = await fetch(url)
  const responseDepart = await responde.json()
  setDepart(responseDepart)
}
useEffect(() => {
  fetchApi()
})
const secondFetch = async () => {
  const responsecity = await fetch(ur)
  const responseCity = await responsecity.json()
  setCity(responseCity)
}
useEffect(() => {
  secondFetch()
})


return (
  <form onSubmit={HandleSubmit} className="record" >
    <div className='completeRecord'>
    <h1 className='prom'>REGISTRATE AQUÍ</h1>
      <div className='files'>
        <div className='filesOne'>  

          <input type="name" name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='enter your name' onKeyUp={handleCharacterName} required></input>
          <p className='alertIcorrect'>{msgName}</p>
          <input type="alias" name='alias' value={alias} onChange={(e) => setAlias(e.target.value)} placeholder='enter your alias' onKeyUp={handleCharacterAlias} required></input>
          <p className='alertIcorrect'>{msgAlias}</p>
          <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter your email' onKeyUp={handleCharacterEmail} required></input>
          <p className='alertIcorrect'>{msgEmail}</p>
          <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='enter your password' onKeyUp={handleCharacterPassword} required></input>
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
                  { !City ? 'Cargando...' :
                    City.map((City,index) => {
                      return <option key={index} value={City.city}> {City.city} </option>
                    })}
            </select>
          <input type="address" name='address' value={address} onChange={(e) => setAddress(e.target.value)} placeholder='enter your address' required></input>
          <input type="phone" name='phone' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='entert your phone' onKeyUp={handleCharacterPhone} required></input>
          <p className='alertIcorrect'>{msgPhone}</p> 
          <div className='photos'>
            <input className='photo' type="file" name='photo' onChange={(e) => setPhoto(e.target.files[0])} placeholder='enter your profile picture' required></input>
          </div>
        </div>
      </div>
                  
      <div className='terminosAcep'>
        <label className='terminoss'><input type="checkbox" name='terminos' className='terminosone' id='terminos' checked={terminos} onClick={handleTerminos} ></input>Al hacer click en "REGISTRARSE", Acepta Nuestras Condiciones, la politica <br></br>de datos y la politica de cookies.</label> 
        <p className='alertIcorrects'>{msgCheck}</p>
      </div>
       <button type="submit" className='btnSubmirRecord' >Registrarse</button>
       <div className="hr" />
       <a href="foo">Ya tienes una cuenta</a>
    </div>
     
  </form>
)
}