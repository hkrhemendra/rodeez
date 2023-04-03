import { validationResult } from "express-validator";
import { getEnvironmentVariables } from "../environments/env";
import * as jwt from 'jsonwebtoken';
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { query } from "express";


export class GlobalMiddleware{
    static checkError(req, res, next){
        const error = validationResult(req);
        if(!error.isEmpty()){
            next(new Error(error.array()[0].msg));
        }else {
            next();
        }
    }

    static async authenticate(req, res, next) {
        const authHeader = req.headers.authorization;

        const token = authHeader ? authHeader.slice(7, authHeader.length) : null;

        try{
            req.errorStatus = 401;
            jwt.verify(token, getEnvironmentVariables().jwt_secret, ((err, decoded) => {
                if(err){
                    next(err)
                }else if(!decoded){
                    next(new Error('User Not Authorized'))
                }else{
                    req.user = decoded;
                    next()
                }
            }))
        }catch(e){
            next(e)
        }
    }

    static async authenticateAdmin(req, res, next) {
        const authHeader = req.headers.authorization;

        const token = authHeader ? authHeader.slice(7, authHeader.length) : null;
        const userRepository = AppDataSource.getRepository(User)
        try{
            req.errorStatus = 401;
            jwt.verify(token, getEnvironmentVariables().jwt_secret, (async(err, decoded) => {
                if(err){
                    next(err)
                }else if(!decoded){
                    next(new Error('User Not Authorized'))
                }else{
                    const user = await userRepository.findOneBy({
                        id: decoded.user_id
                    })

                    if(user.is_admin){
                        req.user = decoded;
                        next()
                    }else {
                        req.errorStatus = 422
                        throw new Error('Sorry, you are not authorized as admin.')
                    }
                }
            }))
        }catch(e){
            next(e)
        }
    }

}