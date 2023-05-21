const axios = require("axios")
require('dotenv').config();
const {DB_APi_KEY} = process.env;

/*
GET | /recipes/:idRecipe
Esta ruta obtiene el detalle de una receta específica. Es decir que devuelve un objeto con la información pedida en el detalle de una receta.
La receta es recibida por parámetro (ID).
Tiene que incluir los datos de los tipos de dietas asociados a la receta.
Debe funcionar tanto para las recetas de la API como para las de la base de datos.
*/
const getByIdApi = async (id) =>{
 const responseApi = (await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${DB_APi_KEY}`)).data
let  responseInfo = {
    id: responseApi.id,
    name: responseApi.title,
    image: responseApi.image,
    summary: responseApi.summary,
    healthScore: responseApi.healthScore,
    steps: responseApi.analyzedInstructions[0]?.steps.map((e)=>{
        return{
            number: e.number,
            step: e.step
        }
    }),
    score: responseApi.winePairing.productMatches[0]?.score,
    diets: responseApi.diets,
   }
   return responseInfo
}

/*
📍 GET | /recipes/name?="..."
Esta ruta debe obtener todas aquellas recetas que coincidan con el nombre recibido por query. (No es necesario que sea una coincidencia exacta).
Debe poder buscarla independientemente de mayúsculas o minúsculas.
Si no existe la receta, debe mostrar un mensaje adecuado.
Debe buscar tanto las de la API como las de la base de datos.
*/
const getAllFoodApi = async () => {
    let responseApi = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${DB_APi_KEY}`)).data
    let result = responseApi.results.map((e)=>{
        return {
            id: e.id,
            title: e.title,
            image: e.image,
            summary: e.summary.replace(/<[^>]*>/g, ""),
            healthScore: e.healthScore,
            steps: e.analyzedInstructions[0]?.steps.map((el)=>{
                return{
                    number: el.number,
                    step: el.step
                }
            }),
            diets: e.diets,
        }
    })
    return result
}

module.exports = {
    getByIdApi,
    getAllFoodApi
}