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
    },[dispatch, id])
    useEffect(()=>{
       return ()=>{ detail = {}}
    },[])

    //console.log("jsjd", detail)
  return (
    <div className={style.div}>
        <div>
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
            {detail.steps?.map((e, i) => {
                return(
                    <div key={i}>
                        <p className={style.paso}>{e?.number}° {e?.step}</p>
                    </div>
                )
            })}
            
        </div>
    </div>
  )
}
