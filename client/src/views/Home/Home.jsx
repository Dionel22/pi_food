//import style from './Home.module.css'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../components/Cards/Cards";
import NavBar from "../../components/NavBar/NavBar";
import { getAllFoods } from "../../redux/Actions/action";
/*
Sector en el que se vea un listado de cards con las recetas. Al iniciar deberá cargar los primeros resultados obtenidos desde la ruta GET /recipes y deberá mostrar su:
Imagen.
Nombre.
Tipos de dietas.
*/

export default function Home() {
  const dispatch = useDispatch()
  const allFoods = useSelector((state) => state.allFoods)
  useEffect(()=>{
  dispatch(getAllFoods())
  },[dispatch])
  console.log("fkk",allFoods)
  return (
    <div>
        <NavBar/>
        <Cards allFoods={allFoods}/>
    </div>
  )
}
