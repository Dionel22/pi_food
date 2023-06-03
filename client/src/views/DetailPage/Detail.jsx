import style from './Detail.module.css'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getDesmonta, getDetail } from "../../redux/Actions/action"

export default function Detail() {
    const { id } = useParams()
    const dispatch = useDispatch()
    let detail = useSelector((state)=> state.details)

    useEffect(()=>{
       dispatch(getDetail(id))
    },[dispatch, id])

    useEffect(()=>{
      return ()=>  dispatch(getDesmonta())
    },[dispatch])

    //console.log("jsjd", detail)
  return (
    <>
   <div className={detail.msg? style.div1: style.div}>
        { !detail.msg? <div>
            <h2 className={style.id}>Id: {detail.id}</h2>
            <h2 className={style.name}>{detail.title}</h2>
            <img className={style.image} src={detail.image} alt={detail.title} />
            <h2 className={style.Hsummary}>Summary</h2>
            <p className={style.summary}>{detail.summary}</p>
            <h3  className={style.healthScore}>Health Score: {detail.healthScore}</h3>
             <h3 className={style.Hdiet}>Diets</h3>
            {detail.diets?.map((e,i) => {
                return <span key={i} className={style.diet} >{e.name}</span>  
            })}

            <h3 className={style.Hpaso}>Steps to Steps</h3>

            <div className={style.boxSteps}>
            {detail.steps?.map((e, i) => {
                return <span key={i} className={style.paso}>{e?.number}° {e?.step}</span>
            })}
            </div>

        </div>: <div>
           <h2 className={style.msg}>{detail.msg}. </h2>
        </div>
        }
        
    </div> 
       
        <footer className={detail.msg  ? style.fooFalla :style.foo}>
            <h4 className={style.H}>creado con amor @Dionel</h4>
        </footer>
    </>
  )
}
