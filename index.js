import express from "express";
import recipesRouter from "./routers/recipeRoutes.js";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use("/recipes", recipesRouter);

app.get('/', (req, res) => {
    res.send('root')
})

app.post('/', (req, res) => {
    res.send('POST request to the root')
})

app.put('/', (req, res) => {
    res.send('PUT request to the root')
})

app.delete('/', (req, res) => {
    res.send('DELETE request to the root')
})


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});