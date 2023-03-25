import {
    Router
} from "express";
import { FriendsController } from "../controllers/FriendsController";
import { GlobalMiddleware } from "../middlewares/CheckError";
import { FriendsValidator } from "../validator/FriendsValidator";


export class FriendsRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }

    getRoutes() {
        this.router.get('/list/friends',GlobalMiddleware.checkError, GlobalMiddleware.authenticate, FriendsController.listFriends)
        this.router.get('/list/group', GlobalMiddleware.checkError, GlobalMiddleware.authenticate, FriendsController.listGroups);
    }

    postRoutes() {
        this.router.post( 
            '/invite', 
            FriendsValidator.invite(), 
            GlobalMiddleware.checkError, 
            GlobalMiddleware.authenticate, 
            FriendsController.invite
        );
        this.router.post(
            '/create/group',
            FriendsValidator.createGroup(),
            GlobalMiddleware.checkError,
            GlobalMiddleware.authenticate,
            FriendsController.createGroup
        )
    }

    patchRoutes() {
            this.router.patch('/accept/invite',
            FriendsValidator.acceptInvite(), 
            GlobalMiddleware.checkError, 
            GlobalMiddleware.authenticate, 
            FriendsController.acceptInvite
        )
        this.router.patch('/add/group/members', FriendsValidator.addMembers(), GlobalMiddleware.checkError, GlobalMiddleware.authenticate, FriendsController.addMembers);

    }

    deleteRoutes() {}

}

export default new FriendsRouter().router;