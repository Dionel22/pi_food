import style from './Home.module.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../components/Cards/Cards";
import Paginado from "../../components/Paginado/Paginado";
import { getAllFoods, getReset } from "../../redux/Actions/action";
import { ordenAseByDec, ordenByApiAndDb, ordenByDiets, ordenFood } from "../../redux/Actions/action";

export default function Home() {
  const dispatch = useDispatch()
  const allFoods = useSelector((state) => state.allFoods)
  const [pagina, setPagina] = useState(1)
  const currentPagina = 9;
  const nextPagina = pagina * currentPagina;
  const lastPagina = nextPagina - currentPagina;
  const allFoodsPag = allFoods.msg ? allFoods : allFoods.slice(lastPagina, nextPagina);


  const handlesPag = (value) => {
    setPagina(value)
  }
  const handlesPagNext = (value) => {
    setPagina(value)
  }

  useEffect(() => {
    dispatch(getAllFoods())
  }, [dispatch])

  const handlesOrdenByApiAndDb = (event) => {
    dispatch(ordenByApiAndDb(event.target.value))
    setPagina(1)
  }

  const handlesOrdenByDiets = (event) => {
    dispatch(ordenByDiets(event.target.value))
    setPagina(1)
  }

  const handlesOrdenByAseAndDec = (event) => {
    dispatch(ordenAseByDec(event.target.value))
    setPagina(1)
  }

  const handlesOrdenByComida = (event) => {
    dispatch(ordenFood(event.target.value))
    setPagina(1)
  }
  const handleReset = () => {
    dispatch(getReset())
    setPagina(1)
  }

  return (
    <>
      <div>
        {/*ORDEN POR API O DB*/}
        <select className={style.select} defaultValue='msg' onChange={handlesOrdenByApiAndDb}>
          <option value="msg" disabled>Created In</option>
          <option value="All">All</option>
          <option value="Api">Api</option>
          <option value="Db">Db</option>
        </select>

        {/*ORDEN POR DIETA*/}
        <select className={style.select} defaultValue='msg' onChange={handlesOrdenByDiets}>
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

        {/*ORDEN POR HEALTH SCORE*/}
        <select className={style.select} defaultValue='msg' onChange={handlesOrdenByComida}>
          <option value="msg" disabled>Health Score</option>
          <option value="alto">100 to 0</option>
          <option value="bajo">0 to 100</option>
        </select>

        {/*ORDEN POR ASC Y DEC*/}
        <select className={style.select} defaultValue='msg' onChange={handlesOrdenByAseAndDec}>
          <option value="msg" disabled>Alphabetic</option>
          <option value="ascendentemente">A-Z</option>
          <option value="descendentemente">Z-A</option>
        </select>

        {/*RESETEA*/}
        <button className={style.select} onClick={handleReset}>Reset</button>

        <Paginado
          currentPagina={currentPagina}
          allFoods={allFoods.length}
          handlesPag={handlesPag}
          handlesPagNext={handlesPagNext}
          pagina={pagina}
        />

        <Cards allFoods={allFoodsPag} />
      </div>
    </>
  )
}
