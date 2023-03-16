import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import UserRouter from './routes/UserRouter';
import {
    AppDataSource
} from './data-source';
import AdminRouter from './routes/AdminRouter';
import FriendRouter from './routes/FriendsRouter';
import MessageRouter from './routes/MessageRouter';
import { WebSocketServer } from 'ws';
import PlanRouter from './routes/PlanRouter';
import FileRouter from './routes/FileRouter';

export class Server {
    public app: express.Application = express();
    // static wss: any  = new WebSocketServer({port: 8080});;

    constructor() {
        this.setConfigurations();
        this.setRoutes();
        this.error404Handler();
        this.handleError();
        // this.initiateSocket();
    }

    setConfigurations() {
        this.connectToMySQL();
        this.configureBodyParser();
    }

    connectToMySQL() {
        AppDataSource.initialize().then(() => {
            console.log("DB connected successfully")
        }).catch((error) => {
            console.log(error)
        })
    }

    configureBodyParser() {
        this.app.use(bodyParser.urlencoded({
            extended: true
        }))
    }

    setRoutes() {
        this.app.use('/ftp',express.static('static/images'));
        this.app.use('/ftp',express.static('static/docs'));
        this.app.use('/api/user/', UserRouter);
        this.app.use('/api/admin/', AdminRouter);
        this.app.use('/api/friends/', FriendRouter);
        this.app.use('/api/messages/', MessageRouter);
        this.app.use('/api/plan/', PlanRouter);
        this.app.use('/api/file/', FileRouter);
    }

    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).json({
                message: "Not Found",
                status_code: 404
            })
        })
    }

    handleError() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || "Something went wrong. Please try again.",
                status_code: errorStatus
            })
        })
    }

}