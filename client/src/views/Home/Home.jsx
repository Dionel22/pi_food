//import style from './Home.module.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../components/Cards/Cards";
import NavBar from "../../components/NavBar/NavBar";
import Paginado from "../../components/Paginado/Paginado";
import { getAllFoods, ordenAseByDec, ordenByApiAndDb, ordenByDiets, ordenFood } from "../../redux/Actions/action";
/*
Paginado: el listado de recetas se hará por partes. Tu SPA debe contar con un paginado que muestre un total de 9 recetas por página.
*/
export default function Home() {
  const dispatch = useDispatch()
  const allFoods = useSelector((state) => state.allFoods)
  console.log(allFoods)
  const [pagina, setPagina] = useState(1)
  const currentPagina = 9;
  const nextPagina = pagina * currentPagina;
  const lastPagina = nextPagina - currentPagina;
  const allFoodsPag = allFoods.msg ? null: allFoods.slice(lastPagina,nextPagina);


 const handlesPag = (value) =>{
  setPagina(value)
 }
 const handlesPagNext = (value) =>{
  setPagina(value)
 }

  useEffect(()=>{
  dispatch(getAllFoods())
  },[dispatch])

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
    <div>
        <NavBar/>
        {/*ORDEN POR API O DB*/}
        <select onChange={handlesOrdenByApiAndDb}>
          <option value="Api">Api</option>
          <option value="Db">Db</option>
        </select>

        {/*ORDEN POR DIETA*/}
        <select onChange={handlesOrdenByDiets}>
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
        <select onChange={handlesOrdenByComida}>
          <option value="alto">healthy food++</option>
          <option value="bajo">healthy food--</option>
        </select>

        {/*ORDEN POR ASC*/}
        <select onChange={handlesOrdenByAseAndDec}>
          <option value="ascendentemente">Aa-Zz</option>
          <option value="descendentemente">Zz-Aa</option>
        </select>
        <Paginado currentPagina={currentPagina} allFoods={allFoods.length} handlesPag={handlesPag} handlesPagNext={handlesPagNext} pagina={pagina}/>
        <Cards allFoods={allFoodsPag}/>
    </div>
  )
}
