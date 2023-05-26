import style from './LandingPage.module.css'
import { Link } from "react-router-dom"
/*LANDING PAGE | deberás crear una página de inicio o bienvenida con:

Alguna imagen de fondo representativa al proyecto.
Botón para ingresar a la home page. */
export default function LandingPage() {
  return (
    <div className={style.div}>
      <h2 className={style.h2}>PI Food</h2>
      <h2 className={style.bien}>Bienvenidos</h2>
      <p className={style.p}>Aqui Puedes encontrar Más De 100 recetas <br/> y 10 Tipos De Dietas</p>

      <Link to="/home" className={style.link}><button className={style.boton}>HOME</button></Link>
    </div>
  )
}
