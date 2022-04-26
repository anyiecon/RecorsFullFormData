import React, { useState, useEffect } from 'react';

export const Deptos = () => {

  const [dpto, setDpto] = useState([]);
  const [ciudades, setCiudades] = useState([]);

  const URL = "https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.json"

  const getDptos = () => {
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setDpto(data);
      })
  }

  const getMunicipios = (e) => {
    const slcMunicipios = document.getElementById("select-municipios");

    dpto.forEach(element => {
      if (element.departamento === e.target.value) {
        setCiudades(element.ciudades);
        console.log(element.ciudades);
        slcMunicipios.style.display = 'block';
      }
    });
  }

  useEffect(() => {
    getDptos();
  }, [])


  return (
    <>
      <select onInput={getMunicipios} name="" id="">
        <option value="Select">Seleccione un departamento</option>
        {
          dpto.map(dep => (
            <option key={dep.id} value={dep.departamento}>{dep.departamento}</option>
          ))
        }
      </select>
      <select name="" id="select-municipios" className='select-municipios'>
        <option value="Select">Seleccione un Municipio</option>
        {
          ciudades.map(ciudad => (
            <option key={ciudad} value={ciudad}>{ciudad}</option>
          ))
        }
      </select>
    </>
  )
}
