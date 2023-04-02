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
        this.router.post('/create/plan', PlanValidator.createPlan(), GlobalMiddleware.checkError, GlobalMiddleware.authenticate ,PlanController.createPlan)
        this.router.post('/create/task', PlanValidator.createTask(), GlobalMiddleware.checkError, GlobalMiddleware.authenticate, PlanController.createTask)
        this.router.post('/create/event', PlanValidator.createEvent(), GlobalMiddleware.checkError, GlobalMiddleware.authenticate, PlanController.createEvent)
    }

    patchRoutes() {
    }

    deleteRoutes() {

    }

}

export default new PlanRouter().router;