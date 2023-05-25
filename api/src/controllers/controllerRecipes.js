require('dotenv').config();
const { DB_APi_KEY } = process.env;
const axios = require("axios")
const { Recipe, Diet } = require("../db");
//es un json donde tengo 100 datos
const datas = require("./data.json")



//-------All-Food--Api---------
const getAllFoodApi = async () => {
  // let datas = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&offset=0&addRecipeInformation=true&apiKey=${DB_APi_KEY}`)).data
    let result = datas.results.map((e)=>{
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
  const responseDB = await Recipe.findAll({include: Diet});
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
    diets: responseApi.diets,
   }
   return responseInfo
}

//--------ID--DB-----------
const getByidDB = async (id) => {
    const recipe = await Recipe.findByPk(id, {
        include: { model: Diet, attributes: ["name"] }
      });
      const diets = recipe?.dataValues.diets.map((diet) => diet.name);

      return { ...recipe.dataValues, diets };
}

//---------POST----------
const postRecipeDB = async (title, image, summary, healthScore, steps, diets) => {
   // console.log(diets)

       const  savedRecipe = await Recipe.create({ title, image, summary, healthScore, steps });
       const dbase = await Diet.findAll({ where: { name: diets } });
       await savedRecipe.addDiet(dbase);
       //console.log("dsd",dbase)
       return savedRecipe;

}  

module.exports = {
    getByIdApi,
    getAllFood,
    postRecipeDB,
    getByidDB,
}