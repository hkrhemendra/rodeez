import { AppDataSource } from "../data-source"
import { Group } from "../entity/Friends"
import { Messages } from "../entity/Message"
import { User } from "../entity/User"
import { Message } from "../interface/Message"
import { sendMessage } from "../utils/SendMessage"


export class MessageController{

    static async sendMessage(req, res, next){
        let receiver_id = req.body.receiver_id
        let message = req.body.message
        let user = req.user.user_id

        try {

            const userRepository = AppDataSource.getRepository(User)
            const messageRepository = AppDataSource.getRepository(Messages)

            const sender = await userRepository.findOneBy({
                id: user
            })
            const receiver = await userRepository.findOneBy({
                id: receiver_id
            })

            let socketMessage: Message = {
                sender: user,
                text: message,
                recipient: receiver_id
            }

            sendMessage(socketMessage, req.headers.host)

            const messageObj = new Messages()
            messageObj.message_body = message
            messageObj.receiver = receiver
            messageObj.user = sender

            await messageRepository.save(messageObj)

            res.json({
                status: 200,
                data: messageObj
            })

        } catch (error) {
            console.log(error)
            next(error)
        }

    }


    static async sendGroupMessage(req, res, next){
        const user_id = req.user.user_id
        const group_id = req.body.group_id
        const message = req.body.message

        try{
            const userRepository = AppDataSource.getRepository(User)
            const groupRepository = AppDataSource.getRepository(Group)
            const messageRepository = AppDataSource.getRepository(Messages)

            const user = await userRepository.findOneBy({
                id: user_id
            })
            const group = await groupRepository.findOneBy({
                id: group_id
            })

            const messageObj = new Messages()
            messageObj.message_body = message
            messageObj.user = user
            messageObj.group_receiver = group

            await messageRepository.save(messageObj)

            res.json({
                status: 200,
                data: messageObj
            })
            
        }catch(error){
            console.log(error)
            next(error)
        }
    }

    static async fetchMessages(req, res, next){
        const id = req.query.id
        const user_id = req.user.user_id
        try {
            const userRepository = AppDataSource.getRepository(User)
            const messageRepository = AppDataSource.getRepository(Messages)

            const sendMessages = await messageRepository.find({
                where: {
                    user: {
                        id: user_id
                    },
                    receiver: {
                        id: id
                    }
                },
                relations: ["user"]
            })

            const receivedMessages = await messageRepository.find({
                where: {
                    user: {
                        id: id
                    },
                    receiver: {
                        id: user_id
                    }
                },
                relations: ["user"]
            })

            const allMessages = sendMessages.concat(receivedMessages)

            allMessages.sort((a: any, b: any) => {
                return a.created_at.getTime() - b.created_at.getTime();
            });

            res.json({
                status: 200,
                data: allMessages
            })

        } catch (error) {
            console.log(error)
            req.errorStatus = 422
            next(error)
        }
    }

    static async fetchGroupMessage(req, res, next){
        const group_id = req.query.group_id
        const user_id = req.user.user_id

        try {

            const userRepository = AppDataSource.getRepository(User)
            const groupRepository = AppDataSource.getRepository(Group)
            const messageRepository = AppDataSource.getRepository(Messages)

            const messages = messageRepository.find({
                where: {
                    group_receiver: {
                        id: group_id
                    }
                }
            })

            res.json({
                status: 200,
                data: messages
            })
            
        } catch (error) {
            console.log(error)
            req.errorStatus = 422
            next(error)
        }

    }

}