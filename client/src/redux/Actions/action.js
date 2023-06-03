import axios from "axios"
import { 
  All_FOOD, 
  GET_BY_FILTER_DIETS, 
  GET_BY_NAME, 
  GET_BY_ORDEN_API_DB, 
  GET_BY_ORDEN_ASC_O_DES, 
  GET_BY_ORDEN_FOOD, 
  GET_DETAIL, 
  GET_DIETS, 
  POST_FOOD, 
  RESET 
} from "./types"

//Trae todo los Food
export const getAllFoods = () => {
  return async (dispatch) => {
    try {
      const response = (await axios.get('http://localhost:3001/recipes')).data;
      //console.log('aa', data);
      return dispatch({
        type: All_FOOD,
        payload: response,
      });
    } catch (error) {
      // Manejo de errores
      console.error('Error al obtener los alimentos:', error.message);
      // Podrías despachar una acción para manejar el error en tu estado global si lo deseas
      return dispatch({
        type: All_FOOD,
        payload: {msg: `Error al obtener los alimentos: ${error.message}`},
      });
    }
  };
};
//rewset
export const getReset = () => {
  return async (dispatch) => {
    
      return dispatch({
        type: RESET,
      });
    
    
  };
};
//Trae todo los Diets
export const getAllDiets = () => {
    return async (dispatch) =>{
      const response = (await axios.get(`http://localhost:3001/diets`)).data
      return dispatch({
        type: GET_DIETS,
        payload: response
      })
    }
}

//Trae solo por nombre
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

//Ordena por Asc y Dec
export const ordenAseByDec = (value) => {
  return async (dispatch) => {
     // console.log("hshs")
      return dispatch({
            type: GET_BY_ORDEN_ASC_O_DES,
            payload: value
        })
    }
}

//Ordena por comida
export const ordenFood = (value) => {
  return async (dispatch) => {
      return dispatch({
            type: GET_BY_ORDEN_FOOD,
            payload: value
        })
    }
}

//Ordena por comida
export const ordenByApiAndDb = (value) => {
  return async (dispatch) => {
      return dispatch({
            type: GET_BY_ORDEN_API_DB,
            payload: value
        })
    }
}

//Ordena por Diets
export const ordenByDiets = (value) => {
  return async (dispatch) => {
      return dispatch({
            type: GET_BY_FILTER_DIETS,
            payload: value
        })
    }
}

//traer por id
export const getDetail = (id) => {
  return async (dispatch) => {
    try {
      const response = (await axios.get(`http://localhost:3001/recipes/${id}`)).data
    //console.log("de",response)
      return dispatch({
            type: GET_DETAIL,
            payload: response
        })
   
    } catch (error) {
      return dispatch({
        type: GET_DETAIL,
        payload: {msg: error.message}
    })
    }
  }
}
export const getDesmonta = () => {
  return async (dispatch) => {
    const response = {};
      return dispatch({
            type: GET_DETAIL,
            payload: response
        })
  }  
}

//crea food
export const createFood = (body) => {
  return async (dispatch) => {
    await axios.post(`http://localhost:3001/recipes`, body)
    //console.log("de",response)
      return dispatch({
            type: POST_FOOD,
        })
  }  
}