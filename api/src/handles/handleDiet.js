const getAllDietsDB = require("../controllers/controllerDiets");

const getHandleDiets = async (req, res) => {
    try {
        const response = await getAllDietsDB();
        return res.status(200).json(response)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

module.exports = getHandleDiets;