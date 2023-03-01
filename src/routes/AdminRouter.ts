import {
    Router
} from "express";
import { AdminController } from "../controllers/AdminController";
import { UserController } from "../controllers/UserController";
import { GlobalMiddleware } from "../middlewares/CheckError";
import { UserValidators } from "../validator/UserValidator";


export class AdminRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }

    getRoutes() {
        this.router.get('/all/users', GlobalMiddleware.authenticateAdmin, AdminController.getAllUsers);
    }

    postRoutes() {
        
    }

    patchRoutes() {
        
    }

    deleteRoutes() {
        
    }

}

export default new AdminRouter().router;