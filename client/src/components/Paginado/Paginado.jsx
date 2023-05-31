import style from './Paginado.module.css'

export default function Paginado({ pagina, allFoods, currentPagina, handlesPag }) {
   // console.log(props)
    let pageNumberArray = [];
    let currentPageNumber = pagina; 
    const division = Math.ceil(allFoods / currentPagina)
    for (let i = 1; i <= division; i++) {
        pageNumberArray.push(i)
    }

  const handlesButton = (value) => {
     handlesPag(value)
  }

  const handlesButtonNext = (e) => {
      if (currentPageNumber < division) {
        currentPageNumber++;
       handlesPag(currentPageNumber);
   }
  }
  const handlesButtonLast = (e) => {
      if (currentPageNumber > 1) {
        currentPageNumber--;
        handlesPag(currentPageNumber);
   }
  }

  return (
    <div >
        <button className={style.boton} onClick={handlesButtonLast}>last</button>
        {pageNumberArray?.map((e, i)=> <button className={e === currentPageNumber ? style.boton :style.ahora} key={i} onClick={()=>handlesButton(e)}>{e}</button>)}
        <button className={style.boton} onClick={handlesButtonNext}>next</button>
    </div>
  )
}
