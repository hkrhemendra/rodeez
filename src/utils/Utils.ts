import { rejects } from 'assert';
import * as Bcrypt from 'bcrypt';
import { resolve } from 'path';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

export class Utils {

    public MAX_TOKEN_TIME = 60000;

    static generateVerificationToken(size: number = 5) {
        let digits = '0123456789';
        let otp = '';

        for (let i = 0; i < size; i++) {
            otp += digits[Math.floor(Math.random() * 10)]
        }

        return parseInt(otp)
    }

    static async encryptPassword(password: string) {
        return new Promise((resolve, reject) => {
            Bcrypt.hash(password, 10,async (err, hash) => {
                    if (err) {
                        reject();
                    } else {
                        console.log(hash)
                        return resolve(hash);
                    }
                
            });
        })
        
    }

    static async comparePassword(password:{plainPassword:string, encryptPassword:string}): Promise<any>{
        return new Promise(async (resolve, reject) => {
            Bcrypt.compare(password.plainPassword, password.encryptPassword, ((err, isSame)=> {
                if(err){
                    reject(err);
                }else if(!isSame){
                    resolve(false)
                }else {
                    resolve(true);
                }
            }))
        })
    }

    static async checkUser(user_id){
        try{
            const userRepository = AppDataSource.getRepository(User)
            let user = await userRepository.findOneBy({
                id: user_id
            })

            if(user){
                return true
            }else{
                return false
            }
            
        }catch(error){
            console.log(error)
            return false
        }
       
    }

}