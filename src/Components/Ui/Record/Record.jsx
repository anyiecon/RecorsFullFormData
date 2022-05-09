import React, {useState, useEffect} from 'react'
import axios from 'axios';
import './Record.css';
import { useNavigate } from 'react-router';
import swal from 'sweetalert';


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
  const[msgEmail, setMsgEmail]=useState("")
  const[msgName, setMsgName]=useState("")
  const[msgAlias, setMsgAlias]=useState("")
  const[msgPassword, setMsgPassword]=useState("")
  const[msgPhone, setMsgPhone]=useState("")
  const [terminos, cambiarTerminos] = useState(false);
  const [msgCheck, setMsgCheck] = useState();
  const [dpto, setDpto] = useState([]);
  const [ciudades, setCiudades] = useState([]);
 
  var formData = new FormData();

  const navigate = useNavigate()

  const HandleSubmit= async (e)=>{
    e.preventDefault()
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
     // console.log(res);
      if(res){
        navigate("/LayoutCards")
         swal({
            title: "hola mundo",
            icon: "error"
        })

      }
    })).catch((err => {
      console.log(err);
      if(err){
      
      }
    }))
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
    let validationName= /^[a-zA-Z\t]+|(^$)/
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
    let validationAlias= /^[A-Za-z0-9\t]{3,10}|(^$)/
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
       parrafo="Registro completo"
       setMsgCheck(parrafo)
     }
     else{
       parrafo="Debes aceptar los termino y condiciones para  lpoder registrate"
       setMsgCheck(parrafo)
       
     }
   }

  let URLDepart = 'https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.json'

  let getDptos = () => {
    axios.get(URLDepart).then(res => {
      setDpto(res.data)
    })
  }

  let getMuni = (e) => {
    let docMuni = document.getElementById("select-municipios")
    dpto.forEach(ele => {
      if (ele.departamento === e.target.value) {
        setCiudades(ele.ciudades);
      }
    })
  }

  useEffect(() => {
    getDptos();
  }, [])



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
          <select className='selectDepart' onInput={getMuni} type="department" name='department' id="" value={department} onChange={(e) => setDepartment(e.target.value)} >
            <option value="Select">Select a Department</option>
            {
              dpto.map(dep => (
                <option key={dep.id} value={dep.departamento}>{dep.departamento}</option>
              ))
            }
          </select>
          <select className='selectMuni' id="select-municipios" type="municipality" name ='municipality' value={municipality} onChange={(e) => setMunicipality(e.target.value)}>
            <option value="Select">Select a Municipality</option>
            {
              ciudades.map(ci => (
                <option key={ci} value={ci}>{ci}</option>
              ))
            }
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
        <label className='terminoss'><input type="checkbox" name='terminos' className='terminosone' id='terminos' checked={terminos} onClick={handleTerminos} required='Debes aceptar nuestros terminos y condiciones para poder registrarte'></input>Al hacer click en "REGISTRARSE", Acepta Nuestras Condiciones, la politica <br></br>de datos y la politica de cookies.</label> 
        <p className='alertIcorrects'>{msgCheck}</p>
      </div>
       <button type="submit" className='btnSubmirRecord' >Registrarse</button>
       <div className="hr" />
       <a href="foo">Ya tienes una cuenta</a>
    </div>
     
  </form>
)
}