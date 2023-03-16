import {
    Router
} from "express";
import { GlobalMiddleware } from "../middlewares/CheckError";
import { PlanValidator } from "../validator/PlanValidator";
import { PlanController } from '../controllers/PlanController';

export class PlanRouter {
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
        this.router.get('/create/plan', PlanValidator.createPlan(), GlobalMiddleware.checkError, PlanController.createPlan)
    }

    patchRoutes() {
    }

    deleteRoutes() {

    }

}

export default new PlanRouter().router;