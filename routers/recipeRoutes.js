import express from 'express';
import { getRecipes, getRecipe } from '../controllers/recipeControllers.js';

const recipesRouter = express.Router()

recipesRouter.get('/', getRecipes);
recipesRouter.get('/:id', getRecipe)

export default recipesRouter;