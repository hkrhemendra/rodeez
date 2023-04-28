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
        this.router.get('/get/user/plan', GlobalMiddleware.authenticate, PlanController.getTask)
        this.router.get('/get/event', PlanValidator.getEvent(), GlobalMiddleware.checkError, GlobalMiddleware.authenticate, PlanController.getTask)
        this.router.get('/get/task', PlanValidator.getTask(), GlobalMiddleware.checkError, GlobalMiddleware.authenticate, PlanController.getTask)
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