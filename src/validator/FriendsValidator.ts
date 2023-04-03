import{
    body, query
} from 'express-validator';
import { AppDataSource } from '../data-source';
import { Group, Request } from '../entity/Friends';
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
            body("name", "Please enter a valid name").isString()
        ]
    }

    static addMembers(){

        const userRepository = AppDataSource.getRepository(User)
        const groupRepository = AppDataSource.getRepository(Group)

        return [
            body("members", "Please pass user ids in array")
            .custom(async(members, {req}) => {
                if(Array.isArray(JSON.parse(members))){
                    return true
                }else{
                    throw new Error("Some of the users are not registerd please try with registered users.")
                }
            }),
            body("group_id", "Please pass valid group ID")
                .custom(async(group_id, {req}) => {
                    return await groupRepository.findOneBy({
                        id: group_id
                    }).then((group) => {
                        if(group){
                            return true
                        }else{
                            return new Error("Please enter valid group id")
                        }
                    })
                })
        ]
    }

    static checkContactList(){
        return [

            body('contact_list', "Please enter valid contact list").isArray()

        ]
    }

    static inviteToApp(){
        return [
            query('phone', "Please provide valid phone number")
                .isNumeric()
        ]
    }

    static listGroupMembers(){
        let groupRepository = AppDataSource.getRepository(Group);

        return query('group_id', 'Please enter group id')
            .isNumeric()
                .custom(async(group_id, {req})=> {
                    return await groupRepository.findOneBy({
                        id: group_id
                    }).then((group)=> {
                        if(group){
                            return true
                        }else {
                            return new Error("Please enter valid group ida")
                        }
                    })
                })
    }
   

}