import { ObjectId } from "mongodb";

export default class News {

    constructor(
        public titulo: string,
        public chapeu: string,
        public texto: string,
        public autor: string,
        public imagem: string,
        public dataPublicacao: string,
        public tags: string,
        public link: string,
        public ativo: boolean,
        public id?: ObjectId
    ) {
    }
}