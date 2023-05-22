const { Router } = require("express");
const {getHandleByName, getHandleById, postHandle } = require("../handles/handleRecipe");

const routerRecipe = Router();

routerRecipe.get("/", getHandleByName)
routerRecipe.get("/:id", getHandleById)
routerRecipe.post("/", postHandle)

module.exports = routerRecipe;