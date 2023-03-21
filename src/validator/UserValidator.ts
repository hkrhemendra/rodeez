import{
    body, query
} from 'express-validator';
import { AppDataSource } from '../data-source';

import {Token, User} from '../entity/User'
import { Utils } from '../utils/Utils';


export class UserValidators {

    static singUp(){
        const usersRepository = AppDataSource.getRepository(User)
        return [
            body('firstName', 'First Name required').isString(),
            body('email', 'Email is required').isEmail().custom(async (email, {req})=>{
                return await usersRepository.findOneBy({
                    email: email
                }).then((user)=>{
                    if(user){
                        req.errorStatus = 422;
                        throw new Error('Email already exist')
                    }else{
                        return true
                    }
                })
            }),
            body('phone', "Phone number required")
                .isLength({min: 10, max: 12})
                    .isNumeric()
                        .withMessage('Please enter you phone')
                            .custom(async(phone, {req})=> {
                                return await usersRepository.findOneBy({
                                    phone: phone
                                }).then(user => {
                                    if(user){
                                        req.errorStatus = 422;
                                        throw new Error('Phone no already exist')
                                    }else{
                                        return true
                                    }
                                })
                            })
                        ,
            body('password', 'Password required')
                .isAlphanumeric()
                    .isLength({min: 6})
                        .withMessage('Min 6 characters required')
        ]
    }

    static googleSignUp(){
        const userRepository = AppDataSource.getRepository(User)
        return [
            body('firstName', 'First Name required').isString(),
            body('email', 'Email is required').isEmail()
                .custom(async(email, {req})=> {
                    return await userRepository.findOneBy({
                        email: email
                    }).then((user)=> {
                        if(user){
                            if(!user.is_google ){
                                return new Error("you are already registered")
                            }else{
                                return false
                            }
                        }else {
                            return true
                        }
                        
                    })

                }),
        ]
    }

    static login(){
        const usersRepository = AppDataSource.getRepository(User)
        return [
            query('login_id','Email or Phone number is required')
                .custom(async(login_id, {req}) => {
                    return await usersRepository.find({
                        where:[{email:login_id},{phone: login_id}] }).then(user => {
                        if(user){
                            req.user = user[0];
                            return true
                        }else {
                            req.errorStatus = 422
                            throw new Error('User Does Not Exist')
                        }
                    })
                }),
            query('password', 'Password is required').isAlphanumeric()
    ]
    }

    static sendOtp(){
        const usersRepository = AppDataSource.getRepository(User)
        return [
            query('phone','Phone number is required')
                .custom(async(login_id, {req}) => {
                    return await usersRepository.find({
                        where:[{phone: login_id}] }).then(user => {
                        if(user){
                            req.user = user[0];
                            return true
                        }else {
                            req.errorStatus = 422
                            throw new Error('User Does Not Exist')
                        }
                    })
                }),
        ]
    }


    static verifyUser(){
        return [
            body('verification_token', 'Verification Token is Require').isNumeric()
    ]
    }

    static verifyResetPasswordToken(){
        const userRepository = AppDataSource.getRepository(User)
        const tokenRepository = AppDataSource.getRepository(Token)
        
        return [
            query('reset_password_token', 'Reset Password Token is required')
                .isNumeric().custom(async(token, {req})=> {
                    const mainUser = await userRepository.findOneBy({
                        email: req.body.email
                    })
                    return await tokenRepository.find({
                        where: { user: {id: mainUser.id}}
                    }).then((mainToken) => {
                        if(mainToken[0].reset_password_token == token && Date.now() < mainToken[0].reset_password_token_time.getTime()){
                            return true
                        }else{
                            return new Error('Token Does not exist. Please Request for a new One')
                        }
                    })
                })
        ]
    }

    static verifyOtp(){
        const userRepository = AppDataSource.getRepository(User)
        const tokenRepository = AppDataSource.getRepository(Token)
        
        return [
            query('otp', 'Otp is required')
                .isNumeric().custom(async(otp, {req})=> {
                    const mainUser = await userRepository.findOneBy({
                        phone: req.body.phone
                    })
                    return await tokenRepository.find({
                        where: { user: {id: mainUser.id}}
                    }).then((mainToken) => {
                        if(mainToken[0].otp == otp && Date.now() < mainToken[0].otp_time.getTime()){
                            return true
                        }else{
                            return new Error('Otp Does not exist. Please Request for a new One')
                        }
                    })
                })
        ]
    }

    static sendResetPasswordEmail(){
        const userRepository = AppDataSource.getRepository(User)
        return [
            query('email').isEmail().custom((email, {req})=> {
                return    userRepository.findOneBy({email:email}).then((user)=> {
                    if(user){
                        return true;
                    }else{
                        throw new Error('Email does not exist')
                    }
                })
            })
        ]
    }

    static resetPassword(){
        const userRepository = AppDataSource.getRepository(User)
        return [
            body('email', 'Email is Required')
                .isEmail()
                .custom(async(email, {req}) => {
                    return await userRepository.findOneBy({email:email}).then(user => {
                        if(user){
                            req.user = user;
                            return true
                        }else {
                            throw new Error('User Does Not Exist')
                        }
                    })
                }),

            body('new_password', 'New Password is Required').isAlphanumeric()
                .custom((newPassword, {req}) => {
                    if(newPassword === req.body.confirm_password){
                        return true;
                    }else{
                        throw new Error('Confirm password and new password does not match')
                    }
                }),
            body('confirm_password', 'Confirm Password is Required'),
        ]
    }

    static updatePassword(){
        return [
            body('password', 'Password is Required')
                .isAlphanumeric(),
        body('new_password', 'New Password is Required').isAlphanumeric(),
        body('confirm_password', 'Confirm Password is Required').isAlphanumeric()
            .custom((confirmPassword, {req}) => {
                if(confirmPassword === req.body.new_password){
                    return true
                }else {
                    req.errorStatus = 422;
                    throw new Error('Password and confirm Password does not match')
                }
            })
    ]
    }


}