import { All_FOOD, GET_BY_FILTER_DIETS, GET_BY_NAME, GET_BY_ORDEN_API_DB, GET_BY_ORDEN_ASC_O_DES, GET_BY_ORDEN_FOOD, GET_DETAIL } from "../Actions/types"

const inicialState = {
    allFoods: [],
    allFoodsCopy: [],
    details: [],
}

const reduce = (state = inicialState, action) => {
    switch (action.type) {
        case All_FOOD:
            return{
                ...state,
                allFoods: action.payload,
                allFoodsCopy: action.payload
            }
        case GET_BY_NAME:
            return{
                ...state,
                allFoods: action.payload
            }
        case GET_BY_ORDEN_ASC_O_DES:
            const filterOrden = [...state.allFoods].sort((a,b)=>{
                const comparison = a.title.localeCompare(b.title);
                return action.payload === "ascendentemente" ? comparison : -comparison;
            })
            return {
                ...state,
                allFoods: filterOrden
            }
        case GET_BY_ORDEN_FOOD:
            const filt = [...state.allFoods].sort((a, b) => {
                const comparison = a.healthScore - b.healthScore;
                return action.payload === "bajo" ? comparison : -comparison;
              });
             return{
                ...state,
                allFoods: filt
             }
        case GET_BY_ORDEN_API_DB:
            const filtrarOrigen = action.payload === "Api" ? state.allFoodsCopy.filter((food)=> !isNaN(food.id)? food.id :null): state.allFoodsCopy.filter((food)=> isNaN(food.id)? food.id :null)

            return{
                ...state,
                allFoods: filtrarOrigen,
            }
        case GET_BY_FILTER_DIETS:
            const filtByDiets = [...state.allFoods].filter((food)=> food.diets?.some(diet => diet.name === action.payload))
            return{
                ...state,
                allFoods: filtByDiets
            }
        case GET_DETAIL:
            return {
                ...state,
                details: action.payload
            }
        default:
          return {...state}
    }
}

export default reduce;