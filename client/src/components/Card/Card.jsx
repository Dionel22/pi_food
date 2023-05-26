import style from './Card.module.css'

export default function Card(props) {
  return (
    <div key={props.id}>
        <h2>{props.title}</h2>
        <img className={style.image} src={props.image} alt={props.title} />
        {props.diets?.map((diet, index)=>{
            return <p key={index} >{diet}</p>
        })}
    </div>
  )
}
