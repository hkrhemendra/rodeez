import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import { getEnvironmentVariables } from './environments/env';
import UserRouter from './routes/UserRouter';
import { AppDataSource } from './data-source';
import  AdminRouter from './routes/AdminRouter';
import FriendRouter from './routes/FriendsRouter';
import MessageRouter from './routes/MessageRouter';

export class Server{
    public app: express.Application = express();
    constructor(){
        this.setConfigurations();
        this.setRoutes();
        this.error404Handler();
        this.handleError();
    }

    setConfigurations(){
        this.connectToMySQL();
        this.configureBodyParser();
    }

    connectToMySQL(){
        AppDataSource.initialize().then(()=> {
            console.log("DB connected successfully")
        }).catch((error)=> {
            console.log(error)
        })
    }

    configureBodyParser(){
        this.app.use(bodyParser.urlencoded({extended:true}))
    }

    setRoutes(){
        this.app.use('/api/user/', UserRouter)
        this.app.use('/api/admin/', AdminRouter)
        this.app.use('/api/friends/', FriendRouter)
        this.app.use('/api/messages/', MessageRouter)
    }

    error404Handler(){
        this.app.use((req, res) => {
            res.status(404).json({
                message: "Not Found",
                status_code: 404
            })
        })
    }

    handleError(){
        this.app.use((error, req, res, next)=> {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || "Something went wrong. Please try again.",
                status_code: errorStatus
            })
        })
    }
}