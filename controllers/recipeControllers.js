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

export const getRecipe = async (req, res) => {
    let { id } = req.params;
    try {
        const query = `SELECT
    Recipes.id,
    Recipes.title,
    Recipes.servings,
    Recipes.calories,
    Recipes.picture,
    Recipes.difficulty,
    Recipes.time,
    Recipes.course,
    Recipes.steps,
    STRING_AGG(Ingredients.ingredient_text, ', ') AS all_ingredients
FROM
    Recipes
LEFT JOIN
    RecipeIngredients ON Recipes.id = RecipeIngredients.recipe_id
LEFT JOIN
    Ingredients ON RecipeIngredients.ingredient_id = Ingredients.id
    WHERE Recipes.id=$1
GROUP BY
    Recipes.id, Recipes.title, Recipes.servings, Recipes.calories, Recipes.difficulty, Recipes.time, Recipes.course, Recipes.steps;`
        const { rows } = await pool.query(query, [id])
        res.json(rows[0])

    } catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};