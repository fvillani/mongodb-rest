import express, {Request, Response} from "express";
import {collections} from "../services/database.service";
import News from "../models/news";
import {ObjectId} from "mongodb";

export const newsRouter = express.Router();

newsRouter.use(express.json());

newsRouter.get("/", async (req: Request, res:Response) => {

    try {
        const news = (await collections.news.find({}).toArray()) as News[];

        res.status(200).send(news);
    } catch (error) {

        res.status(500).send(error.message);
    }
});

newsRouter.get("/:id", async (req: Request, res:Response) => {

    const id = req?.params?.id;

    try {

        const query = {_id: new ObjectId(id)};

        const news = (await collections.news.findOne(query)) as News;

        if (news) {
            res.status(200).send(news);
        }
    } catch (error) {
        res.status(404).send(`Não localizado ${req.params.id}`);
    }
});


newsRouter.post("/", async (req: Request, res:Response) => {

    try {

        const newNews = req.body as News;

        const result = await collections.news.insertOne(newNews);

        result
            ? res.status(200).send(`Criado registro id ${result.insertedId}`)
            : res.status(500).send(`Falha ao registrar`);
    } catch (error) {

        console.error(error);

        res.status(400).send(error.message);
    }
});


newsRouter.put("/:id", async (req: Request, res:Response) => {

    const id = req?.params?.id;

    try {

        const updatedNews: News = req.body as News;

        const query = {_id: new ObjectId(id)};

        const result = await collections.news.updateOne(query, { $set: updatedNews });

        result
            ? res.status(200).send(`Atualizado registro id ${id}`)
            : res.status(304).send(`Falha ao atualizar id ${id}`);
    } catch (error) {

        console.error(error.message);

        res.status(400).send(error.message);
    }
});


newsRouter.delete("/:id", async (req: Request, res:Response) => {
    const id = req?.params?.id;

    try {

        const query = {_id: new ObjectId(id)};

        const result = await collections.news.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Deletado registro id ${id}`)
        } else if (!result) {
            res.status(400).send(`Falha ao deletar registro id ${id}`)
        } else if (!result.deletedCount) {
            res.status(404).send(`Não localizado registro id ${id}`)
        }
    } catch (error) {

        console.error(error.message);

        res.status(400).send(error.message);
    }
});