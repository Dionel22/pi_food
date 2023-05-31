//import style from './Form.module.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { createFood, getAllDiets } from "../../redux/Actions/action";
import validation from "./validation";


export default function Form() {
    const dispatch = useDispatch()
    const allDiets = useSelector((state)=> state.diets)
    const [input, setInput] = useState({
        title: "",
        image: "",
        summary:"",
        healthScore: 0,
        steps: [],
        diets: []
       })
    const [inputSteps, setInputSteps] = useState({});

    const [error, setError] = useState({
        title: "",
        image: "",
        summary:"",
        healthScore: 0,
        steps: [],
        diets: []
       })

    useEffect(()=>{
       dispatch(getAllDiets())
    },[dispatch]);

    const handlesImput = (e) => {
       const {name, value} = e.target;
       setInput({
            ...input,
            [name]: value,
        });
        setError(validation({
            ...input,
            [name]: value
        }));
}
    const handlesSteps = (e) => {
       const {name ,value} = e.target;
        setInputSteps({
                ...inputSteps,
                [name]:  value
            })
}
    const handlesDeleteSteps = (data) => {
        const filtar = input.steps.filter((e) => e.step !== data.step && e.number !== data.number)
        setInput({
          ...input,
          steps: filtar
      })
      setError(validation({
          ...input,
          steps: filtar
      }))  

}
    const handlesBoton = (e) => {
       e.preventDefault()
       if (inputSteps.number && inputSteps.step) {
           console.log("----------------------")
        setInput({
            ...input,
            steps: [...input.steps, inputSteps]
        })
        setError(validation({
            ...input,
            steps: [...input.steps, inputSteps]
        }))
        setInputSteps({})
    }else{
        alert("fatla completar")
    }
}

    const handlesDiets = (e) => {
        const { value } = e.target;
      //  console.log(e.target.value)
          setInput({
            ...input,
            diets: [...input.diets, value]
        })
        setError(validation({
            ...input,
            diets: [...input.diets, value]
        }))  
         
    }

    const handlesDeleteDiets = (value) => {
     //   console.log(value)
        const filtar = input.diets.filter((e) => e !== value)
          setInput({
            ...input,
            diets: filtar
        })
        setError(validation({
            ...input,
            diets: filtar
        }))  
         
    }

    const handlesSumbit = (e) => {
        e.preventDefault()
        if (Object.keys(error).length === 0) {
            alert("FOOD creado con éxito!!")
            dispatch(createFood(input))
            setInput({
                title: "",
                image: "",
                summary:"",
                healthScore: 0,
                steps: [],
                diets: []
               })
               setInputSteps({})
        }else{
            alert("Debes completar toda la información requerida!!")
        }
    }
   
    console.log("input", input)
  return (
    <div>
        <form >       
        <input 
        type="text" 
        name="title" 
        value={input.title} 
        placeholder="Title"
        onChange={handlesImput}/>
        <label>Title</label>
        {error.title && <p>{error.title}</p>}

        <textarea
        name="summary"
        value={input.summary}
        onChange={handlesImput}></textarea>
        <label>Summary</label>
        {error.summary && <p>{error.summary}</p>}

        <input 
        type="number" 
        name="healthScore" 
        onChange={handlesImput}/>
        <label>Health Score</label>
        {error.healthScore && <p>{error.healthScore}</p>}

        <input 
        type="text" 
        name="image" 
        onChange={handlesImput}/>
        <label>Image url</label>
        {error.image && <p>{error.image}</p>}
 <div>
        <input 
        type="number" 
        name="number"
        min="1"
        max="10"
        value={inputSteps.number? inputSteps.number: 0}
        onChange={handlesSteps}/>
        <label>Steps Number</label>

        <input 
        type="text" 
        name="step"
        value={inputSteps.step? inputSteps.step : ""}
        onChange={handlesSteps}/>
        <label>Steps</label>

        {error.steps && <p>{error.steps}</p>}
        <button onClick={handlesBoton}>listo</button>
</div>
         <select onChange={handlesDiets}>
         {allDiets?.map((e, i)=>{
            return <option key={i} value={e.name} >{e.name}</option>
         })}</select>
         {error.diets && <p>{error.diets}</p>/*handlesDeleteDiets */}
         <label>Diets</label>

        <button onClick={handlesSumbit} >Create</button>
        </form>
        {/*STEPS*/}
        {input.steps?.map((e,a)=>{
            return <button key={a} onClick={()=>handlesDeleteSteps({step: e.step, number: e.number})} >{e.number}: {e.step}</button>
        })}

        {/*DIETS*/}
        {input.diets?.map((e,i)=>{
            return <button key={i} onClick={()=>handlesDeleteDiets(e)}>{e}</button>
        })}
    </div>
  )
}
