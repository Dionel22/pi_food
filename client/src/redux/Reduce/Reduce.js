import { All_FOOD, GET_BY_NAME } from "../Actions/types"

const inicialState = {
    allFoods: [],
    allFoodsCopy: [],
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
        default:
          return {...state}
    }
}

export default reduce;