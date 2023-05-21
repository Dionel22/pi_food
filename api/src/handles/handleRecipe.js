const { getByIdApi, getAllFoodApi} = require("../controllers/controllerRecipes");

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        let reponse = await getByIdApi(id)
       return res.status(200).json(reponse)
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: error.message})
    }

}
const getByName = async (req, res) => {
    const { name } = req.query;
    try {
        let reponse = await getAllFoodApi()
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


module.exports = {
    getById,
    getByName,
}