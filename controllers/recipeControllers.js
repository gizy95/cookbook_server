import { pool } from "../db/pool.js";
import { recipes } from "../recipes.js";

export const getRecipes = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM recipes')
        res.json(rows)
    } catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getRecipe = (req, res) => {
    let { id } = req.params;
    const recipe = recipes.recipes.find((recipe) => recipe.id === id);
    if (recipe) {
        res.json(recipe);
    } else {
        res.status(404).send("There is no such recipe");
    }
};