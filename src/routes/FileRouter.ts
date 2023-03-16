import {
    Router
} from "express";
import { FileController } from "../controllers/FileController";
import { Utils } from "../utils/Utils";

export class FileRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }

    getRoutes() {
    }

    postRoutes() {
        this.router.post('/upload', Utils.uploader('file', 'image')  ,FileController.upload);
    }

    patchRoutes() {

    }

    deleteRoutes() {}

}

export default new FileRouter().router;