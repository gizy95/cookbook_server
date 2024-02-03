import express from 'express';
import { getRecipes, getRecipe, postRecipe, putRecipe } from '../controllers/recipeControllers.js';

const recipesRouter = express.Router()

recipesRouter.get('/', getRecipes);
recipesRouter.get('/:id', getRecipe)
recipesRouter.post('/', postRecipe)
recipesRouter.put('/:id', putRecipe)
// recipesRouter.delete('/:id', deleteRecipe)

export default recipesRouter;