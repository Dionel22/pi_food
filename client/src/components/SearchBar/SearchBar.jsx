import style from './SearchBar.module.css'
import { useState } from 'react'
import { useDispatch } from "react-redux"
import { getByName } from '../../redux/Actions/action'

export default function SearchBar() {
//SearchBar: un input de búsqueda para encontrar recetas por nombre.
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  
  const handlesInput = (event) => {
     setName(event.target.value)
  }

  const handlesSubmit = (event) => {
    event.preventDefault()
    dispatch(getByName(name))
    setName("")
  }

  return (
    <div className={style.div}>
        <input 
        className={style.input} 
        type="text" 
        placeholder="busqueda..." 
        value={name}
        onChange={handlesInput} />
        <button className={style.boton} onClick={handlesSubmit}>Buscar</button>
    </div>
  )
}
