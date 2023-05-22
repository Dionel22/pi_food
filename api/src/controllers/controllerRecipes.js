require('dotenv').config();
const { DB_APi_KEY } = process.env;
const axios = require("axios")
const { Recipe, Diet } = require("../db");



//-------All-Food--Api---------
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
    return result;
}

//------All-Food--Db-------
const getAllFoodDb = async () => {
  const responseDB = await Recipe.findAll();
  return responseDB
}

//--------All-Food-------
const getAllFood = async () => {
 const [ infoApi, infoDb ] = await Promise.all([getAllFoodApi(), getAllFoodDb()])
 return [...infoApi, ...infoDb]
}

//---------ID--API---------
const getByIdApi = async (id) =>{
 const responseApi = (await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${DB_APi_KEY}`)).data
const responseInfo = {
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
POST | /recipes
Esta ruta recibirá todos los datos necesarios para crear una nueva receta y relacionarla con los tipos de dieta solicitados.
Toda la información debe ser recibida por body.
Debe crear la receta en la base de datos, y esta debe estar relacionada con los tipos de dieta indicados (al menos uno).
*/
const postRecipeDB = async (name,image,summary,score,healthScore,steps,diets) => {
  const responseRecipe = await Recipe.create({name,image,summary,score,healthScore,steps});
  const responseDiet = await Diet.findAll({where: { name: diets }})
  await responseRecipe.addDiet(responseDiet);
  return responseRecipe;
}  


module.exports = {
    getByIdApi,
    getAllFood,
    postRecipeDB,
}