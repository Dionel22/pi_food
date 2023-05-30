import style from './Detail.module.css'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getDetail } from "../../redux/Actions/action"

export default function Detail() {
    const { id } = useParams()
    const dispatch = useDispatch()
    let detail = useSelector((state)=> state.details)
    useEffect(()=>{
       dispatch(getDetail(id))
       return ()=>{ detail = {}}
    },[dispatch, id])
    //console.log("jsjd", detail)
  return (
    <div className={style.div}>
        <div>
            <h2 className={style.id}>Id: {detail.id}</h2>
            <h2 className={style.name}>{detail.title}</h2>
            <img className={style.image} src={detail.image} alt={detail.title} />
            <p className={style.re}>{detail.summary}</p>
            <h3  className={style.healthScore}>Health Score: {detail.healthScore}</h3>
            <h3 className={style.Hpaso}>Steps</h3>
            {detail.steps?.map((e, i) => {
                return(
                    <div key={i}>
                        <p className={style.paso}>{e?.number}° {e?.step}</p>
                    </div>
                )
            })}
             <h3 className={style.Hdiet}>Diets</h3>
            {detail.diets?.map((e,i) => {
                return <p key={i} className={style.diet} >{e.name}</p>  
            })}
        </div>
    </div>
  )
}
