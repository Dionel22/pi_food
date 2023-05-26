import axios from "axios"
import { All_FOOD, GET_BY_NAME } from "./types"

export const getAllFoods = () => {
    return async (dispatch) =>{
      const response = (await axios.get(`http://localhost:3001/recipes`)).data
      return dispatch({
        type: All_FOOD,
        payload: response
      })
    }
}

export const getByName = (name) => {
  return async (dispatch) => {
     // console.log("hshs")
      const response = (await axios.get(`http://localhost:3001/recipes?name=${name}`)).data
     // console.log("<xc", response)
      return dispatch({
            type: GET_BY_NAME,
            payload: response
        })
    }
}