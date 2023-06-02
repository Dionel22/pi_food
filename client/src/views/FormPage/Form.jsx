import style from './Form.module.css'
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
        healthScore: "",
        steps: [],
        diets: []
       })
    const [inputSteps, setInputSteps] = useState({});

    const [error, setError] = useState({})

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
   /* const handlesDeleteSteps = (data) => {
        const filtar = input.steps.filter((e) => e.step !== data.step && e.number !== data.number)
        setInput({
          ...input,
          steps: filtar
      })
      setError(validation({
          ...input,
          steps: filtar
      }))  

}*/
    const handlesBoton = (e) => {
       e.preventDefault()
       console.log(e)
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
                healthScore: "",
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
    <>
    <div className={style.div}>
        <form >       
        <h2 className={style.create}>CREATE BY FOOD</h2>
        <img className={style.cuchillo} src="https://cdn-icons-png.flaticon.com/512/47/47458.png" alt="cuchillo" />
        <img className={style.tenedor} src="https://images.vexels.com/media/users/3/211791/isolated/preview/c03169a8744f4a8dad16bbb1c2c90d99-tenedor-de-cocina.png" alt="tenedor" />
         <img className={style.gorro} src="https://i.pinimg.com/originals/f7/9a/66/f79a66c1ffc68a1b4492d98b7288d671.png" alt="tenedor" />
        <div className={style.input_field_title}>
        <input 
        required
        type="text" 
        name="title" 
        value={input.title}
        className={style.inputTitle}
        onChange={handlesImput}/>
        <label className={input.title ? style.titleTop :style.labelTitle}>Title</label>
        {error.title && <p className={style.pTitle}>{error.title}</p>}
        </div>
      
      <div className={style.input_field_summary}>
        <textarea
        name="summary"
        value={input.summary}
        className={style.inputSummary}
        onChange={handlesImput}></textarea>
        <label className={input.summary ? style.summaryTop :style.labelSummary}>Summary</label>
        {error.summary && <p className={style.pSummary}>{error.summary}</p>}
      </div>

      <div className={style.input_field_healthScore}>
        <input 
        type="number" 
        name="healthScore" 
        min="0"
        max="100"
        className={style.inputHealthScore}
        onChange={handlesImput}/>
        <label className={input.healthScore ? style.HealthScoreTop :style.labelHealthScore}>Health Score</label>
        {error.healthScore && <p className={style.pHealthScore}>{error.healthScore}</p>}
        </div>
       
       <div className={style.input_field_Image}>
        <input 
        type="text" 
        name="image" 
        className={style.inputImage}
        value={input.image}
        onChange={handlesImput}/>
        <label className={input.image ? style.ImageTop : style.labelImage}>Image url</label>
        {error.image && <p className={style.pImage}>{error.image}</p>}
        </div>

 <div className={style.input_field_Steps_Number}>
        <input 
        type="number" 
        name="number"
        min="1"
        max="10"
        className={style.inputStepsNumber}
        value={inputSteps.number ? inputSteps.number : 0}
        onChange={handlesSteps}/>
        <label className={style.StepsNumberTop}>Number</label>
</div>

 <div className={style.input_field_Steps}>
       <input 
        type="text" 
        name="step"
        value={inputSteps.step? inputSteps.step : ""}
        className={style.inputSteps}
        onChange={handlesSteps}/>
        <label className={style.StepsTop}>Steps</label>
        </div>
        {error.steps ? <p className={style.pSteps} >{error.steps}</p>: null}

        <button className={style.boton_steps} onClick={handlesBoton}>listo</button>

        <div className={style.input_field_Diets}>
        {<select className={style.selectDiets} onChange={handlesDiets} defaultValue ='msg'>
            <option value="msg" disabled>Diets</option>
         {allDiets?.map((e, i)=>{
            return <option key={i} value={input.diets.length === 0 ? "msg" :e.name} >{e.name}</option>
         })}</select>}
         <label className={style.labelDiets}>Diets</label>
         {error.diets && <p className={style.pDiets}>{error.diets}</p>/*handlesDeleteDiets */}
         
      </div>
        <button onClick={handlesSumbit} className={style.create_Boton} >Create</button>
 </form>

    </div>
        {/*STEPS*/}
        <label className={style.labelDeleteSteps}>Steps to Steps</label>
        <div className={style.boton_delete_steps}>
        {input.steps?.map((e,a)=>{
            return <span key={a}  className={style.steps}>{e.number}°: {e.step}</span>
        })}
        </div>
        {/*DIETS*/}
        <div className={style.boton_delete_Diets}>
        {input.diets?.map((e,i)=>{
            return <button key={i} className={style.boton_diets} onClick={()=>handlesDeleteDiets(e)}>{e}</button>
        })}
        </div >
    <footer className={style.foo}>
            <h4 className={style.H}>Creado Con Amor @Dionel</h4>
    </footer>
    </>
  )
}
