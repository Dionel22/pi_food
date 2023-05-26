import style from './SearchBar.module.css'

export default function SearchBar() {
  return (
    <div className={style.div}>
        <input className={style.input} type="text" placeholder="busqueda..." />
        <button className={style.boton}>Buscar</button>
    </div>
  )
}
