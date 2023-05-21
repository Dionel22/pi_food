const { Router } = require("express");
const { getById, getByName } = require("../handles/handleRecipe");

const routerRecipe = Router();

routerRecipe.get("/:id", getById)
routerRecipe.get("/", getByName)

module.exports = routerRecipe;