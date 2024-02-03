import { pool } from "../db/pool.js";

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
    STRING_AGG(Ingredients.ingredient_text, ', ') AS ingredients
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

export const postRecipe = async (req, res) => {
  try {
    const {
      title,
      picture,
      servings,
      calories,
      difficulty,
      time,
      course,
      steps,
    } = req.body;
    const { rows } = await pool.query(
      "INSERT INTO Recipes (title, picture, servings, calories, difficulty, time, course, steps) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [title, picture, servings, calories, difficulty, time, course, steps]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const putRecipe = async (req, res) => {
  let { id } = req.params;
  try {
    const { steps } = req.body;
    const { rows } = await pool.query(
      "UPDATE Recipes SET steps=$1 WHERE id=$2 RETURNING *",
      [steps, id]
    );
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const deleteRecipe = async (req, res) => {};