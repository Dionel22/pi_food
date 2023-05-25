const getAllDietsDB = require("../controllers/controllerDiets");
const { getByIdApi, getAllFood, postRecipeDB, getByidDB} = require("../controllers/controllerRecipes");

// trae todos los food y busca por nombre
const getHandleByName = async (req, res) => {
  const { name } = req.query;
  try {
    let response = await getAllFood();
    if (name) {
      let responseName = response.filter((el) => el.title.toLowerCase().includes(name.toLowerCase()));
      if (responseName.length === 0) {
        return res
          .status(200)
          .json({ msg: `No se encontró ninguna receta con el nombre ${name}` });
      } else {
        return res.status(200).json(responseName);
      }
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

//busca por id
const getHandleById = async (req, res) => {
    const { id } = req.params;
    try {
        if (isNaN(id)) {
           const reponseDb = await getByidDB(id)
           return res.status(200).json(reponseDb)
        }
        const reponse = await getByIdApi(id)
        return res.status(200).json(reponse)
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({msg: error.message})
    }
}

//crea y lo guarda en la base de datos
const postHandle = async (req, res) => {
    const { title, image, summary, healthScore, steps, diets } = req.body;
    try {
        const responsePost = await postRecipeDB( title, image, summary, healthScore, steps, diets );
        return res.status(200).json(responsePost)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
};


module.exports = {
    getHandleByName,
    getHandleById,
    postHandle,
}