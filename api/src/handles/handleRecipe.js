const { getByIdApi, getAllFood, postRecipeDB} = require("../controllers/controllerRecipes");

// trae todos los food y busca por nombre
const getHandleByName = async (req, res) => {
    const { name } = req.query;
    try {
        let reponse = await getAllFood()
        if(name){
          let responseName = reponse.filter((el)=> el.title.toLowerCase().includes(name.toLowerCase()))
            responseName.length === 0? res.status(200).json({msg: `No Se Encontro receta con el Nombre ${name}`}) : res.status(200).json(responseName) 
         }
       return res.status(200).json(reponse)
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: error.message})
    }

}

//busca por id
const getHandleById = async (req, res) => {
    try {
        const { id } = req.params;
        let reponse = await getByIdApi(id)
       return res.status(200).json(reponse)
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: error.message})
    }
}

const postHandle = async (req, res) => {
    const {name,image,summary,score,healthScore,steps,diets} = req.body;
    try {
        const response = await postRecipeDB(name,image,summary,score,healthScore,steps,diets);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
};


module.exports = {
    getHandleByName,
    getHandleById,
    postHandle,
}