import{
    body, query
} from 'express-validator';
import { AppDataSource } from '../data-source';
import { Request } from '../entity/Friends';
import { User } from '../entity/User';
import { Utils } from '../utils/Utils';


export class FriendsValidator{

    static invite(){
        const userRepository = AppDataSource.getRepository(User)
        const requestRepository = AppDataSource.getRepository(Request)
        return [
            body('receiverId', "Receiver Id is missing")
                .isNumeric()
                    .custom(async(receiverId, {req}) => {
                        return await userRepository.findOneBy({
                            id: receiverId
                        }).then((user)=> {
                            if(user){
                                return true
                            }else{
                                req.errorStatus = 422
                                throw new Error("Invalid receiver id. Receiver Id not found")
                            }
                        })
                    })
        ]
    }

    static acceptInvite(){
        const userRepository = AppDataSource.getRepository(User)
        const requestRepository = AppDataSource.getRepository(Request)

        return [
            body('senderId', "Sender ID missgin")
                .isNumeric()
                    .custom(async(senderId, {req})=> {
                        return await userRepository.findOneBy({
                            id: senderId
                        }).then((user)=>{
                            if(user){
                                return true;
                            }else{
                                req.errorStatus = 422;
                                throw new Error('Invalid user id');
                            }
                        })
                    })
        ]
    }

    static createGroup(){
        const userRepository = AppDataSource.getRepository(User)
        return [
            body("members", "Please pass user ids in array")
                .custom(async(members, {req}) => {
                    if(Array.isArray(JSON.parse(members))){
                        return true
                    }else{
                        throw new Error("False")
                    }
                }),
            body("name", "Please enter a valid name").isString()
        ]
    }
   

}