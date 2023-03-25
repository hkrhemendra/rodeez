import {
    Router
} from "express";
import { UserController } from "../controllers/UserController";
import { GlobalMiddleware } from "../middlewares/CheckError";
import { UserValidators } from "../validator/UserValidator";


export class UserRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }

    getRoutes() {
        this.router.get('/send/verification/email', GlobalMiddleware.authenticate, UserController.resendVerificationEmail);
        this.router.get('/login', UserValidators.login(), GlobalMiddleware.checkError, UserController.login)
        this.router.get('/login/send/otp', UserValidators.sendOtp(), GlobalMiddleware.checkError, UserController.sendOtp)
        this.router.get('/login/verify/otp', UserValidators.verifyOtp(), GlobalMiddleware.checkError, UserController.verifyOtp)
        this.router.get('/reset/password', UserValidators.sendResetPasswordEmail(), GlobalMiddleware.checkError, UserController.sendResetPasswordEmail)
        this.router.get('/reset/password/phone', UserValidators.sendResetPasswordMessage(), GlobalMiddleware.checkError, UserController.sendResetPasswordMessage)
        this.router.get('/verify/resetPasswordToken', UserValidators.verifyResetPasswordToken(), GlobalMiddleware.checkError, UserController.verifyResetPasswordToken)
        this.router.get('/get/all/users', GlobalMiddleware.authenticate, UserController.getAllUsers);
    }

    postRoutes() {
        this.router.post('/signup', UserValidators.singUp(), GlobalMiddleware.checkError, UserController.signUp)
        this.router.post('/google/signup', UserValidators.googleSignUp(), GlobalMiddleware.checkError, UserController.googleSignUp);
    }

    patchRoutes() {
        this.router.patch('/verify', UserValidators.verifyUser(), GlobalMiddleware.checkError, GlobalMiddleware.authenticate  ,UserController.verify)
        this.router.patch('/update/password', UserValidators.updatePassword(), GlobalMiddleware.checkError, GlobalMiddleware.authenticate, UserController.updatePassword)
        this.router.patch('/reset/password', UserValidators.resetPassword(), GlobalMiddleware.checkError, UserController.resetPassword)
    }

    deleteRoutes() {

    }

}

export default new UserRouter().router;