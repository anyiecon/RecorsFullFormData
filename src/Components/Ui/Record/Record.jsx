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

  var formData = new FormData();

const HandleSubmit= async (e)=>{

  console.log(name);
  console.log(alias);
  console.log(email);
  console.log(password);
  console.log(department);
  console.log(municipality);
  console.log(address);
  console.log(phone);
  console.log(photo);


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
   //const [terminos , cambiarTerminos]=useState(false);

  

  return (
    <form onSubmit={HandleSubmit} className="record" >
      <p>RECORD USERS</p>
      <div className='files'>
        <div className='filesOne'>  
          <input type="name" name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='enter your name'></input>
          <input type="alias" name='alias' value={alias} onChange={(e) => setAlias(e.target.value)} placeholder='enter your alias' ></input>
          <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter your email'></input>
          <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='enter your password'></input>
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
          <input type="phone" name='phone' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='entert your phone'></input>
          <input type="file" name='photo' onChange={(e) => setPhoto(e.target.files[0])} placeholder='enter your profile picture'></input> 
        </div>
      </div>
      <label><input type="checkbox" name='terminos' id='terminos' text='hola'></input>Al hacer click en "REGISTRARSE", Acepta Nuestras Condiciones, la politica de datos y la politica de cookies.</label> 

       <button type="submit">Registrarse</button>
    </form>
  )
}

