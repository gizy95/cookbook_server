import 'dotenv/config'
import express from "express";
import recipesRouter from "./routers/recipeRoutes.js";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use("/recipes", recipesRouter);

app.get('/', (req, res) => {
    res.send('root')
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});