import { AppDataSource } from "../data-source";
import { User } from "../entity/User";


export class AdminController{
    static async getAllUsers(req, res, next){
        try{
            const userRepository = AppDataSource.getRepository(User);
            const allUser = await userRepository.find()
            res.json({
                status: 200,
                users: allUser
            })
        }catch(error){
            next(error)
        }
    }
}