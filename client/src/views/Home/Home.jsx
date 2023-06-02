import style from './Home.module.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../components/Cards/Cards";
import Paginado from "../../components/Paginado/Paginado";
import { getAllFoods } from "../../redux/Actions/action";

export default function Home() {
  const dispatch = useDispatch()
  const allFoods = useSelector((state) => state.allFoods)
 // console.log(allFoods)
  const [pagina, setPagina] = useState(1)
  const currentPagina = 9;
  const nextPagina = pagina * currentPagina;
  const lastPagina = nextPagina - currentPagina;
  const allFoodsPag = allFoods.msg ? allFoods: allFoods.slice(lastPagina,nextPagina);


 const handlesPag = (value) =>{
  setPagina(value)
 }
 const handlesPagNext = (value) =>{
  setPagina(value)
 }

  useEffect(()=>{
  dispatch(getAllFoods())
  },[dispatch])


  return (
    <>
    
        <Paginado currentPagina={currentPagina} allFoods={allFoods.length} handlesPag={handlesPag} handlesPagNext={handlesPagNext} pagina={pagina}/>
        <Cards allFoods={allFoodsPag}/>
        <footer className={allFoods.msg || allFoods.length === 0 ? style.fooFalla: style.foo}>
          <h4 className={style.H}>creado con amor @Dionel</h4>
        </footer>
    </>
  )
}
