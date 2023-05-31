import style from './NavBar.module.css'
import SearchBar from "../SearchBar/SearchBar";
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { ordenAseByDec, ordenByApiAndDb, ordenByDiets, ordenFood } from "../../redux/Actions/action";

export default function NavBar() {
  const dispatch = useDispatch();
  const location = useLocation();

  const handlesOrdenByApiAndDb = (event) => {
    dispatch(ordenByApiAndDb(event.target.value))
  }

  const handlesOrdenByDiets = (event) => {
    dispatch(ordenByDiets(event.target.value))
  }

  const handlesOrdenByAseAndDec = (event) => {
    dispatch(ordenAseByDec(event.target.value))
  }

  const handlesOrdenByComida = (event) => {
    dispatch(ordenFood(event.target.value))
  }
  return (
    <>
    <div className={style.div}>
       <Link to="/"><img className={style.image} src="https://d31uz8lwfmyn8g.cloudfront.net/Assets/logo-henry-white-lg.png" alt="henry" /></Link>
        <Link to="/home"><button className={style.boton}>Home</button></Link>
        <Link to="/create"><button className={style.boton}>Create</button></Link>
        <SearchBar/>
    </div>
    {location.pathname === "/home" && <div>
    {/*ORDEN POR API O DB*/}
    <select className={style.select} defaultValue ='msg' onChange={handlesOrdenByApiAndDb}>
          <option value="msg" disabled>Created In</option>
          <option value="All">All</option>
          <option value="Api">Api</option>
          <option value="Db">Db</option>
        </select>

        {/*ORDEN POR DIETA*/}
        <select className={style.select} defaultValue ='msg' onChange={handlesOrdenByDiets}>
        <option value="msg" disabled>Type of Diets</option>
          <option value="gluten free">gluten free</option>
          <option value="dairy free">dairy free</option>
          <option value="lacto ovo vegetarian">lacto ovo vegetarian</option>
          <option value="vegan">vegan</option>
          <option value="paleolithic">paleolithic</option>
          <option value="primal">primal</option>
          <option value="whole 30">whole 30</option>
          <option value="pescatarian">pescatarian</option>
          <option value="ketogenic">ketogenicl</option>
          <option value="fodmap friendly">fodmap friendly</option>
        </select>

        {/*ORDEN POR comida*/}
        <select className={style.select} defaultValue ='msg' onChange={handlesOrdenByComida}>
        <option value="msg" disabled>Health Score</option>
          <option value="alto">100 to 0</option>
          <option value="bajo">0 to 100</option>
        </select>

        {/*ORDEN POR ASC*/}
        <select className={style.select} defaultValue ='msg' onChange={handlesOrdenByAseAndDec}>
        <option value="msg" disabled>Alphabetic</option>
          <option value="ascendentemente">A-Z</option>
          <option value="descendentemente">Z-A</option>
        </select>
      </div>}
    </>
  )
}
