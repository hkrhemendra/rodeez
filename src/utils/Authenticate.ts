import * as jwt from 'jsonwebtoken';
import { decode } from 'punycode';
import { getEnvironmentVariables } from "../environments/env";

export const authenticateToken = (token: string) => {

    if(!token){
        return false
    }

    token = token.split(' ')[1];

    try{
        return jwt.verify(token, getEnvironmentVariables().jwt_secret, ((err, decoded) => {
            if(err){
                return false;
            }else if(!decoded){
                false
            }else{
                console.log('Decoded Data-----> ',decoded["user_id"])
                return decoded;
            }
        }))
    }catch(err){
        console.error(err)
        return false
    }

}