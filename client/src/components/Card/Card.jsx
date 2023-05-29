import style from './Card.module.css'
import { Link } from "react-router-dom"

export default function Card(props) {
  return (
    <Link to={`/detail/${props.id}`} className={style.link}>
    <div key={props.id} className={style.div}>
        <div className={style.content}>

            <div className={style.front}>
               <img className={style.image} src={props.image} alt={props.title} />
            </div>

            <div className={style.back}>
            <h1 className={style.titulo}>Title</h1>
             <h2 className={style.name} >{props.title}</h2>
            <h1 className={style.diet}>Diets</h1>
            {props.diets?.map((diet, index)=>{
                return <h4 key={index} className={style.types}>{diet?.name}</h4>
             })}
           </div>

        </div>
    </div>
    </Link>
  )
}
