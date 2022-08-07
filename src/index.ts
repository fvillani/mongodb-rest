import express from "express";
import {connectToDatabase} from "./services/database.service";
import {newsRouter} from "./routes/news.router";

const app = express();

const port = 8080;

connectToDatabase()
    .then(() => {

        app.use('/news', newsRouter);

        app.listen(port, () => {
            console.log(`Server start http://localhost:${port}`)
        });
    })
    .catch((error: Error) => {

        console.log(`Falha ao conectar no banco`, error);

        process.exit();
    });