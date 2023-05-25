const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routerRecipe = require("./routerRecipes");
const routerDiets = require('./routerDiets');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", routerRecipe);
router.use("/diets", routerDiets);


module.exports = router;
