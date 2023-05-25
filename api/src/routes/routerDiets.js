const { Router } = require("express");
const getHandleDiets = require("../handles/handleDiet")

const routerDiets = Router();

routerDiets.get("/", getHandleDiets);

module.exports = routerDiets;