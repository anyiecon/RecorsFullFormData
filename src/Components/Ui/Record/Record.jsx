import {React, useState} from 'react'
import axios from 'axios';
import './Record.css'

export const Record=()=> {
  //const URL= 'https://backend-fullmarket-py.herokuapp.com/createuser'
  const [recordvalue, setRecordvalue]= useState({
    name:'',
    alias:'',
    email:'',
    password:'',
    department:'',
    municipality:'',
    address:'',
    phone:'',
    photo: ''
  });

  const handleSubmit= async()=>{
    const recordFormData = new FormData();
    recordFormData.append("name", recordvalue.name)
    recordFormData.append("alias", recordvalue.alias)
    recordFormData.append("email", recordvalue.email)
    recordFormData.append("password", recordvalue.password)
    recordFormData.append("department", recordvalue.department)
    recordFormData.append("municipality", recordvalue.municipality)
    recordFormData.append("address", recordvalue.address)
    recordFormData.append("phone", recordvalue.phone)
    recordFormData.append("photo", recordvalue.photo)
    
    try {
      const response = await axios({
        method: "post",
        url:'https://backend-fullmarket-py.herokuapp.com/createuser',
        data:recordFormData,
        headers:{"Content-Type": "multipart/from-data"},
      });console.log(response);
    } catch(error){
      console.log(error);
    }
  }
  
  const handleChange= (event)=>{
    setRecordvalue({
      ...recordvalue,
      [event.target.name]: event.target.value
    });
  }

    
  return (
    <form onSubmit={handleSubmit} className="record" >
      <p>RECORD USERS</p>
      <div className='files'>
        <div className='filesOne'>  
          <input type="name" name='name' placeholder='enter your name' value={recordvalue.name} onChange={handleChange} ></input>
          <input type="alias" name='alias' placeholder='enter your alias' value={recordvalue.alias} onChange={handleChange}></input>
          <input type="email" name='email' placeholder='enter your email'value={recordvalue.email} onChange={handleChange}></input>
          <input type="password" name='password' placeholder='entert your password'value={recordvalue.password} onChange={handleChange}></input>
        </div>
        <div className='filesTwo'>
        <input type="department" name='department' placeholder='enter your departament'value={recordvalue.department} onChange={handleChange}></input>
          <input type="municipality" name='municipality' placeholder='enter your municipality'value={recordvalue.municipality} onChange={handleChange}></input>
          <input type="address" name='address' placeholder='enter your address'value={recordvalue.address} onChange={handleChange}></input>
          <input type="phone" name='phone'placeholder='entert your phone'value={recordvalue.phone} onChange={handleChange}></input>
          <input type="photo" name='photo' placeholder='enter your profile picture'value={recordvalue.photo} onChange={handleChange}></input>
        </div>
      </div>
       <button type="submit">Apply</button>
    </form>
  )
}
