import {
    AppDataSource
} from "../data-source";
import {
    Token,
    User
} from "../entity/User";
import {
    Utils
} from "../utils/Utils";
import * as jwt from 'jsonwebtoken';
import {
    getEnvironmentVariables
} from "../environments/env";
import {
    NodeMailer
} from "../utils/NodeMailer";




export class UserController {
    static async signUp(req, res, next) {
        const firstName = req.body.firstName;
        const email = req.body.email;
        const phone = req.body.phone;
        const password = req.body.password;

        try {

            const hash = await Utils.encryptPassword(password)

            const user = new User()
            user.first_name = firstName
            user.email = email
            user.phone = phone
            user.password = hash.toString()

            if (req.body.is_google) {
                user.is_google = req.body.is_google
            }

            const token = new Token()
            token.user = user
            token.verification_token = await Utils.generateVerificationToken()
            token.verification_token_time = new Date(Date.now() + new Utils().MAX_TOKEN_TIME)

            const userRepository = AppDataSource.getRepository(User);
            const tokenRepository = AppDataSource.getRepository(Token);

            await userRepository.save(user)
            await tokenRepository.save(token)

            res.json({
                status: 200,
                data: token
            })
        } catch (e) {
            next(e)
        }
    }

    static async googleSignUp(req, res, next) {
        const firstName = req.body.firstName;
        const email = req.body.email;
        let phone = req.body.phone;
        const avatar = req.body.avatar;
        const userRepository = AppDataSource.getRepository(User);

        try {

            const testUser = await userRepository.findOneBy({
                email: email
            })

            // if(!phone){
            //     phone = null;
            // }

            if(testUser){

                let token = Utils.generateToken(testUser)

                return res.json({
                    status: 200,
                    token: token,
                    data: testUser
                })
            }

            const user = new User()
            user.first_name = firstName
            user.email = email
            user.phone = phone
            user.is_google = true
            user.avatar = avatar
            user.verified = true


            await userRepository.save(user)

            const token = Utils.generateToken(user)


            return res.json({
                status: 200,
                token: token,
                data: user
            })
        } catch (e) {
            next(e)
        }
    }

    static async login(req, res, next) {
        const login_id: string = req.query.login_id;

        const password = req.query.password;

        const user = req.user;
        try {
            await Utils.comparePassword({
                plainPassword: password,
                encryptPassword: user.password
            })

            const token = jwt.sign({
                    email: user.email,
                    phone: user.phone,
                    user_id: user.id
                },
                getEnvironmentVariables().jwt_secret, {
                    expiresIn: '120d'
                }
            );

            const data = {
                status: 200,
                token: token,
                data: user
            }

            res.json(data)

        } catch (error) {
            next(error)
        }
    }

    static async resendVerificationEmail(req, res, next) {
        const email = req.query.email;
        const verificationToken = Utils.generateVerificationToken();

        try {
            const userRepository = AppDataSource.getRepository(User)
            const tokenRepository = AppDataSource.getRepository(Token)

            const user = await userRepository.findOneBy({
                email: email
            })

            console.log("User------------> ", user)

            if (!user) {
                return res.json({
                    status: 422,
                    message: "User doesn't exist. Please register your email first."
                })
            }

            const token = await tokenRepository.find({
                where: {
                    user: {
                        id: user.id
                    }
                }
            });

            // console.log("Token------------> ",token)

            token[0].verification_token = verificationToken
            token[0].verification_token_time = new Date(Date.now() + new Utils().MAX_TOKEN_TIME)
            console.log("Token------------> ", token)
            await tokenRepository.save(token)


            if (token) {
                const mailer = await NodeMailer.sendEmail({
                    to: [user.email],
                    subject: 'Email Verification',
                    html: `<h1>${verificationToken}</h1>`
                })
            }


            res.json({
                success: true
            })

        } catch (error) {
            next(error)
        }

    }

    static async verify(req, res, next) {
        const verificationToken = req.body.verification_token;
        const email = req.body.email;

        try {
            const userRepository = AppDataSource.getRepository(User)
            const user = await userRepository.findOneBy({
                email: email,
            });

            const tokenRepository = AppDataSource.getRepository(Token)
            const token = await tokenRepository.find({
                where: {
                    user: {
                        id: user.id
                    },
                }
            })

            if (token[0].verification_token === Number(verificationToken) && token[0].verification_token_time.getTime() > Date.now()) {
                user.verified = true
                await userRepository.save(user)
                res.json({
                    status: 200,
                    message: "Verified Successfully",
                    userInfo: user
                });
            } else {
                req.errorStatus = 422;
                throw new Error('Verification token is expired. Please Request for new one');
            }

        } catch (e) {
            next(e)
        }

    }

    static verifyResetPasswordToken(req, res, next) {
        res.json({
            status: 200,
            success: true
        })
    }

    static async sendResetPasswordEmail(req, res, next) {
        const email = req.query.email;
        console.log(email)
        const resetPasswordToken = Utils.generateVerificationToken();

        const userRepository = AppDataSource.getRepository(User)
        const tokenRepository = AppDataSource.getRepository(Token)
        try {
            const userInfo = await userRepository.findOneBy({
                email: email
            });

            const token = await tokenRepository.find({
                where: {
                    user: {
                        id: userInfo.id
                    }
                }
            })

            token[0].reset_password_token = resetPasswordToken,
                token[0].reset_password_token_time = new Date(Date.now() + new Utils().MAX_TOKEN_TIME)
            await tokenRepository.save(token)

            res.json({
                status: 200,
                data: token
            })
            await NodeMailer.sendEmail({
                to: [email],
                subject: 'Reset Password Email',
                html: `${resetPasswordToken}`
            })
        } catch (e) {
            next(e)
        }
    }

    static async sendResetPasswordMessage(req, res, next){
        const phone = req.query.phone;
        console.log(phone)
        const resetPasswordToken = Utils.generateVerificationToken();

        const userRepository = AppDataSource.getRepository(User)
        const tokenRepository = AppDataSource.getRepository(Token)
        try {
            const userInfo = await userRepository.findOneBy({
                phone: phone
            });

            const token = await tokenRepository.find({
                where: {
                    user: {
                        id: userInfo.id
                    }
                }
            })

            token[0].reset_password_token = resetPasswordToken,
                token[0].reset_password_token_time = new Date(Date.now() + new Utils().MAX_TOKEN_TIME)
            await tokenRepository.save(token)

            res.json({
                status: 200,
                data: token
            })

        } catch (e) {
            next(e)
        }
    }


    static async resetPassword(req, res, next) {
        const email = req.body.email;
        const newPassword = req.body.new_password;

        const userRepository = AppDataSource.getRepository(User)

        try {
            const encryptedPassword = await Utils.encryptPassword(newPassword);
            const updatedUser = await userRepository.findOneBy({
                email: email
            });

            updatedUser.password = encryptedPassword.toString()
            await userRepository.save(updatedUser)
            res.json({
                status: 200,
                message: "Password reset successfully",
                user: updatedUser
            })
        } catch (e) {
            req.errorStatus(422)
            next(e)
        }

    }

    static async updatePassword(req, res, next) {
        const user_id = req.user.user_id;
        console.log(req.user)
        const password = req.body.password;
        const confirmPassword = req.body.confirm_password;
        const newPassword = req.body.new_password;

        try {
            const userRepository = AppDataSource.getRepository(User);
            await userRepository.findOneBy({
                id: user_id
            }).then(async (user: any) => {
                const isCorrectPassword: boolean = await Utils.comparePassword({
                    plainPassword: password,
                    encryptPassword: user.password
                });

                if (isCorrectPassword === true) {
                    const encryptedPassword = await Utils.encryptPassword(newPassword);
                    const newUser = await userRepository.findOneBy({
                        id: user_id
                    })

                    newUser.password = encryptedPassword.toString();
                    await userRepository.save(newUser);

                    res.json({
                        status: 200,
                        message: "Password updated successfully",
                        user: newUser
                    });
                } else {
                    res.json({
                        status: 422,
                        message: "Please Enter Correct Password"
                    })
                }

            })
        } catch (e) {
            next(e)
        }
    }

    static async sendOtp(req, res, next) {

        const phone = req.query.phone;
        const resetPasswordToken = Utils.generateVerificationToken();

        const userRepository = AppDataSource.getRepository(User)
        const tokenRepository = AppDataSource.getRepository(Token)
        try {
            const userInfo = await userRepository.findOneBy({
                phone: phone
            });

            const token = await tokenRepository.find({
                where: {
                    user: {
                        id: userInfo.id
                    }
                }
            })

            token[0].otp = resetPasswordToken,
            token[0].otp_time = new Date(Date.now() + new Utils().MAX_TOKEN_TIME)
            await tokenRepository.save(token)

            res.json({
                status: 200,
                data: token
            })

        } catch (e) {
            next(e)
        }

    }

    static async verifyOtp(req, res, next) {

        const phone: string = req.query.phone;
        const userRepository = AppDataSource.getRepository(User);

        try {

            const user = await userRepository.findOneBy({
                phone: phone
            })

            const token = jwt.sign({
                    email: user.email,
                    phone: user.phone,
                    user_id: user.id
                },
                getEnvironmentVariables().jwt_secret, {
                    expiresIn: '120d'
                }
            );

            const data = {
                status: 200,
                token: token,
                data: user
            }

            res.json(data)

        } catch (error) {
            next(error)
        }

    }


}