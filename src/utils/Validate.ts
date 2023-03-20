import { AppDataSource } from "../data-source";
import { User } from "../entity/User";



export class ValidatorUtils {

    static async validateUserId(id){
        const userRepository = AppDataSource.getRepository(User)

        const user = await userRepository.findOneBy({
            id: id
        })

        if(user){
            return user
        }

        return false

    }

    static async validateUserPhone(phone){
        const userRepository = AppDataSource.getRepository(User)

        const user = await userRepository.findOneBy({
            phone: phone
        })

        if(user){
            return user
        }

        return false
    }

    static async validateUserEmail(email){
        const userRepository = AppDataSource.getRepository(User)

        const user = await userRepository.findOneBy({
            email: email
        })

        if(user){
            return user
        }

        return false
    }

    static async validateUserArray(idArray){
        if(!Array.isArray(idArray)){
            return false
        }

        const userRepository = AppDataSource.getRepository(User)

        let falseUsers = []

        for(let i; i<idArray.length; i++){
            const user = userRepository.findOneBy({
                id: i
            })

            if(!user){
                falseUsers.push(i)
            }
        }

        if(falseUsers.length > 0){
            return falseUsers
        }
        
        return true

    }

}