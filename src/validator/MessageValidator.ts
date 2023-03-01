import{
    body, query
} from 'express-validator';
import { AppDataSource } from '../data-source';
import { Group } from '../entity/Friends';
import { User } from '../entity/User';


export class MessageValidator{

    static sendMessage(){
        const userRepository = AppDataSource.getRepository(User)    
        return [
            body("receiver_id", "Please enter valid id")
                .isNumeric()
                    .custom(async(receiver_id, {req})=> {
                        return await userRepository.findOneBy({
                            id: receiver_id
                        }).then((user)=> {
                            if(user){
                                console.log('user ----->',user)
                                return true
                            }else{
                                console.log('error user ----->',user)
                                req.errorStatus = 422
                                throw new Error("Invalid id, Please try again with different id")
                            }
                        })
                    }),
            body("message", "Please enter a message").isAlphanumeric()
        ]
    }

    static sendGroupMessage(){
        const groupRepository = AppDataSource.getRepository(Group)
        const userRepository = AppDataSource.getRepository(User)
        return [
            body("group_id", "Invalid group id")
                .isNumeric()
                    .custom(async(groud_id, {req})=> {
                        return await groupRepository.findOneBy({
                            id: groud_id
                        }).then((group)=> {
                            if(group){
                                return true
                            }else {
                                throw new Error("Invalid Group Id")
                            }
                        })
                    })
                    // .custom(async(group_id, {req})=> {
                    //     return await groupRepository.find({
                    //         where: {
                    //             users:{
                    //                 id: req.user.user_id
                    //             }
                    //         },
                    //         relations: ["users"]
                    //     }).then((group)=> {
                    //         if(group){
                    //             return true
                    //         }else{
                    //             throw new Error("Sorry, you are not part of this group")
                    //         }
                    //     })
                    // })
        ]       
    }
}