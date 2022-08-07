import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import {ObjectId} from "mongodb";

export const collections: { news?: mongoDB.Collection } = {}

export async function connectToDatabase() {

    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    await db.command({
        "collMod": process.env.NEWS_COLLECTION_NAME,
        "validator": {
            $jsonSchema: {
                bsonType: "object",
                required: ["chapeu", "titulo", "texto"],
                additionalProperties: false,
                properties: {
                    _id: {},
                    titulo: {
                        bsonType: "string",
                        description: "'titulo' is required and is a string"
                    },
                    chapeu: {
                        bsonType: "string",
                        description: "'chapeu' is required and is a string"
                    },
                    texto: {
                        bsonType: "string",
                        description: "'texto' is required and is a string"
                    },
                    autor: {
                        bsonType: "string",
                        description: "'auto' is a string"
                    },
                    imagem: {
                        bsonType: "string",
                        description: "'imagem' is a string"
                    },
                    dataPublicacao: {
                        bsonType: "string",
                        description: "'dataPublicacao' is a any"
                    },
                    tags: {
                        bsonType: "string",
                        description: "'tag' is a string"
                    },
                    link: {
                        bsonType: "string",
                        description: "'link' is a string"
                    },
                    ativo: {
                        bsonType: "bool",
                        description: "'stivo' is a string"
                    }
                }
            }
        }
    });

    const newsColletion: mongoDB.Collection = db.collection(process.env.NEWS_COLLECTION_NAME);

    collections.news = newsColletion;

    console.log(`conexão com o banvo ${db.databaseName}`);
}