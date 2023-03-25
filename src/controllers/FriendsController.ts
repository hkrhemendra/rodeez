import { json } from "body-parser";
import {
    AppDataSource
} from "../data-source";
import {
    Friends,
    Group,
    Request
} from "../entity/Friends";
import {
    User
} from "../entity/User";

export class FriendsController {

    static async invite(req, res, next) {

        const user = req.user
        const request_id = req.body.receiverId

        try {

            const userRepository = AppDataSource.getRepository(User)
            const requestUser = await userRepository.findOneBy({
                id: request_id
            })
            const mainUser = await userRepository.findOneBy({
                id: user.user_id
            })

            if (requestUser) {
                console.log("requestUser --------------> ", requestUser)
                const requestRepository = AppDataSource.getRepository(Request)

                const newRequestUser = new Request();
                newRequestUser.requestSender = mainUser
                newRequestUser.sendRequest = requestUser
                newRequestUser.response = null
                await requestRepository.save(newRequestUser)

                return res.json({
                    status: 200,
                    data: newRequestUser
                })

            } else {
                req.errorStatus = 422
                return new Error("Request user id not found")
            }

        } catch (error) {
            console.log(error)
            next(error)
        }

    }

    static async acceptInvite(req, res, next) {
        const requestSenderId = req.body.senderId
        const sendRequestId = req.user.user_id

        const userRepository = AppDataSource.getRepository(User)
        const requestRepository = AppDataSource.getRepository(Request)
        const friendRepository = AppDataSource.getRepository(Friends)

        try {

            const request = await requestRepository.find({
                where: {
                    requestSender: {
                        id: requestSenderId
                    },
                    sendRequest: {
                        id: sendRequestId
                    }
                }
            })

            if (request) {

                request.forEach((value) => {
                    value.response = "accepted"
                })
                await requestRepository.save(request)

                return res.json({
                    status: 200,
                    data: request
                })
            } else {
                req.errorStatus = 422
                return new Error('Something went wrong please try again later')
            }

        } catch (error) {
            console.log(error)
            next(error)
        }
    }


    static async listFriends(req, res, next) {
        const user = req.user
        const userRepository = AppDataSource.getRepository(User)
        const requestRepository = AppDataSource.getRepository(Request)
        try {

            const currentUser = await userRepository.findOneBy({
                id: user.user_id
            })

            const friends = await requestRepository.find({
                where: [{
                    sendRequest: {
                        id: user.user_id
                    }
                },
                {
                    requestSender: {
                        id: user.user_id
                    }
                }
            ],
            relations: {
                requestSender: true,
                sendRequest: true
            }
            })
        
            const filteredFriends = friends.map(element => {
                if(element.response === "accepted"){
                    return element
                }
            })

            res.json({
                status: "200",
                data: filteredFriends
            })

        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async createGroup(req, res, next){
        const user = req.user
        let members = req.body.members
        const name = req.body.name

        try {  
            console.log(members)
            const userRepository = AppDataSource.getRepository(User)
            const groupRepository = AppDataSource.getRepository(Group)

            const mainUser = await userRepository.findOneBy({
                id: user.user_id
            })

            let group = new Group()
            group.admin_id = mainUser
            group.is_active = true
            group.name = name

            await groupRepository.save(group)

            res.json({
                status: 200, 
                data: group
            })

        } catch (error) {   
            console.log(error)
            req.errorStatus = 422
            next(error)
        }

    }

    static async listGroups(req, res, next){
        try{
            const user_id = req.user.user_id
            const userRepository = AppDataSource.getRepository(User)
            const groupRepository = AppDataSource.getRepository(Group)

            const users = await userRepository.find({
                where: {
                    id: user_id
                },
                relations: ["group"]
            })

            res.json({
                status: 200,
                data: {users}
            })

        }catch(error){
            console.log(error)
            req.errorStatus = 422
            next(error)
        }
    }

    static async addMembers(req, res, next) {

        let members = req.body.members
        let groupId = req.body.group_id
        let user = req.user
        try {
            const userRepository = AppDataSource.getRepository(User);
            const groupRepository = AppDataSource.getRepository(Group);

            const mainUser = await userRepository.findOneBy({
                id: user.user_id
            });

            members = JSON.parse(members);
            let groupUserArray = [];
            groupUserArray = await Promise.all(members.map(async(element:number) => {

                const users = await userRepository.findOneBy({
                    id: element
                })
                if(user){
                    return await userRepository.findOneBy({
                        id: element
                    })
                }
            }))

            const updateGroup = await groupRepository.findOneBy({
                id: groupId
            });

            updateGroup.users = [...groupUserArray]
            await groupRepository.save(updateGroup)
            
            return res.json({
                status: 200,
                data: updateGroup
            })

        } catch (error) {
            console.log(error)
            next(error)
        }

    }

}