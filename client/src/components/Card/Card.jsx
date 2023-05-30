import style from './Card.module.css'
import { Link } from "react-router-dom"

export default function Card(props) {
  return (
    <>
   { props.title? <Link to={`/detail/${props?.id}`} className={style.link}>
   <div key={props?.id} className={style.div}>
        
            <img className={style.image} src={props.image} alt={props.title} />
          
             <h2 className={style.name} >{props.title}</h2>
            <h1 className={style.diet}>types of diet</h1>
            <li>
            {props.diets?.map((diet, index)=>{
                return <ul key={index} className={style.types}>{diet?.name}</ul>
             })}
         </li>
    </div>
    
    </Link>: 
    <div>
      <h2 className={style.msg}>{props.msg}. </h2>
    </div>}
    </>
  )
}
