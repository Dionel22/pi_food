const axios = require("axios")
const { Diet } = require("../db")
require('dotenv').config();
const { DB_APi_KEY } = process.env;
  
const getAllDietsDB = async () => {
   const responseApi = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&offset=0&addRecipeInformation=true&apiKey=${DB_APi_KEY}`)).data
   console.log(responseApi)
   const responseDiets = responseApi.results.map((e) =>{ 
    return  e.diets?.map(el => {
        return {name: el}
      }) 
   })
   responseDiets.forEach(element => {
     element.forEach(e=>{
        Diet.findOrCreate({where:{name: `${e.name}`}});
       })
    });
    let responseDb = await Diet.findAll({attributes: ["name"]})
  return responseDb;
  }



module.exports = getAllDietsDB;