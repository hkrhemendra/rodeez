import {
    Router
} from "express";
import { MessageController } from "../controllers/MessageController";
import { GlobalMiddleware } from "../middlewares/CheckError";
import { MessageValidator } from "../validator/MessageValidator";


export class MessageRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }

    getRoutes() {
        this.router.get(
            '/fetch',
            GlobalMiddleware.authenticate,
            MessageController.fetchMessages
        )
        this.router.get(
            '/fetch/group',
            GlobalMiddleware.authenticate,
            MessageController.fetchGroupMessage
        )
    }

    postRoutes() {
        this.router.post(
            '/send/message',
            MessageValidator.sendMessage(), 
            GlobalMiddleware.checkError, 
            GlobalMiddleware.authenticate,
            MessageController.sendMessage  
            )
        this.router.post(
            '/send/message/group',
            MessageValidator.sendGroupMessage(),
            GlobalMiddleware.checkError,
            GlobalMiddleware.authenticate,
            MessageController.sendGroupMessage
        )
    }

    patchRoutes() {}

    deleteRoutes() {}

}

export default new MessageRouter().router;