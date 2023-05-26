//import style from './Cards.module.css'
import Card from "../Card/Card"

export default function Cards(props) {
    console.log(props)
  return (
    <div>
        {props.allFoods?.map((food)=>{
            return <Card key={food.id} id={food.id} title={food.title} image={food.image} diets={food.diets} />
        })}
        
    </div>
  )
}
