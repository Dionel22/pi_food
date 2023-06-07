require('dotenv').config();
const { DB_APi_KEY } = process.env;
const axios = require("axios")
const { Recipe, Diet } = require("../db");




//-------All-Food--Api---------
const getAllFoodApi = async () => {
   let response = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&offset=0&addRecipeInformation=true&apiKey=${DB_APi_KEY}`)).data
    let result = response.results.map((e)=>{
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
            diets: e.diets.map(e=>{
                return{name: e}
            }),
        }
    })
    return result;
}

//------All-Food--Db-------
const getAllFoodDb = async () => {
    const recipes = await Recipe.findAll({
      include: { model: Diet, attributes: ["name"], through: { attributes: [] } }
    });
 
    return recipes;
  };

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
    title: responseApi.title,
    image: responseApi.image,
    summary: responseApi.summary.replace(/<[^>]*>/g, ""),
    healthScore: responseApi.healthScore,
    steps: responseApi.analyzedInstructions[0]?.steps.map((e)=>{
        return{
            number: e.number,
            step: e.step
        }
    }),
    score: responseApi.winePairing.productMatches[0]?.score,
    diets: responseApi.diets.map((e)=> {
        return {name: e}
    }),
   }
   return responseInfo
}

//--------ID--DB-----------
const getByidDB = async (id) => {
    const recipe = await Recipe.findByPk(id, {
        include: { model: Diet, attributes: ["name"], through: { attributes: [] } }
      });
    return recipe;
}

//---------POST----------
const postRecipeDB = async (title, image, summary, healthScore, steps, diets) => {

       const  savedRecipe = await Recipe.create({ title, image, summary, healthScore, steps });
       const dbase = await Diet.findAll({ where: { name: diets } });
       await savedRecipe.addDiet(dbase);
       return savedRecipe;

}  

module.exports = {
    getByIdApi,
    getAllFood,
    postRecipeDB,
    getByidDB,
}