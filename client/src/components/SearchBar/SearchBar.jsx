import style from './SearchBar.module.css'

export default function SearchBar() {
//SearchBar: un input de búsqueda para encontrar recetas por nombre.
  return (
    <div className={style.div}>
        <input className={style.input} type="text" placeholder="busqueda..." />
        <button className={style.boton}>Buscar</button>
    </div>
  )
}
