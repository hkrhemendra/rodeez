import {
    AppDataSource
} from "../data-source";
import {
    User
} from "../entity/User";

import { Plan, Task, Event } from "../entity/Plans";




export class PlanController {
    
    static async createPlan(req, res, next){
        const planName = req.body.plan_name
        const photoLink = req.body.photo_link
        const description = req.body.description
        const attachment = req.body.attachment
        const startDate = req.body.start_date
        const endDate = req.body.end_date
        const userArray = req.body.user_array
        const startLocation = req.body.start_location
        const finalLocation = req.body.final_location

        const planRepository = AppDataSource.getRepository(Plan);
        const userRepository = AppDataSource.getRepository(User);
    
        try {
            let fullUserArray = []
            for(let i=0; i<userArray.length; i++){
                fullUserArray.push(await userRepository.findOneBy({
                    id: i
                }))
            }
            
            const plan = new Plan()
            plan.name = planName;
            plan.photo = photoLink;
            plan.description = description;
            plan.file_attachment = attachment;
            plan.start_date =new Date(startDate);
            plan.end_date =new Date(endDate);
            plan.users = fullUserArray
            plan.start_location = startLocation
            plan.final_location = finalLocation

            await planRepository.save(plan)

            return res.json({
                status: 200,
                data: plan
            })
            

        } catch (error) {
            
            return res.json({
                status: 422,
                message: error
            });

        }

    }

    static async createTask(req, res, next){

        const planId = req.body.plan_id
        const date = req.body.date
        const time  = req.body.time
        const description = req.body.description

        const planRepository = AppDataSource.getRepository(Plan)
        const taskRepository = AppDataSource.getRepository(Task)

        try {
            
            const mainPlan = await planRepository.findOneBy({
                id: planId
            })

            const task = new Task()
            task.description = description;
            task.task_date = date;
            task.time = time
            task.plan = mainPlan

            await taskRepository.save(task)

            return res.json({
                status: 200,
                data: task
            })

        } catch (error) {
            
            console.log(error)
            return res.json({
                status: 422,
                message: error
            })

        }

    }

    static async createEvent(req, res, next){

        const planId = req.body.plan_id
        const date = req.body.date
        const start_time = req.body.start_time
        const end_time = req.body.end_time
        const description = req.body.description

        const attachment = req.body.attachment

        const planRepository = AppDataSource.getRepository(Plan)
        const eventRepository = AppDataSource.getRepository(Event)

        try {
            
            const mainPlan = await planRepository.findOneBy({
                id: planId
            })

            const event = new Event()
            event.description = description;
            event.event_date = date;
            event.start_time = start_time
            event.end_time = end_time
            
            if(attachment){
                event.attachment = attachment
            }

            event.plan = mainPlan

            await eventRepository.save(event)

            return res.json({
                status: 200,
                data: event
            })

        } catch (error) {
            
            console.log(error)
            return res.json({
                status: 422,
                message: error
            })

        }

    }

    static async getUserPlan(req, res, next) {

        const userId = req.user.user_id
        const planRepository = AppDataSource.getRepository(Plan)

        try{

            const plans = await planRepository.find({
                where: {
                    users: {
                        id: userId
                    }
                }
            })

            return res.json({
                status: 200,
                data: plans
            })

        }catch(error) {
            console.log(error)
            next(error)
        }

    }

    static async getTask(req, res, next) {

        const planId = req.query.plan_id
        const taskRepository = AppDataSource.getRepository(Task)

        try{

            const tasks = await taskRepository.find({
                where: {
                    plan: {
                        id: planId
                    }
                }
            })

            return res.json({
                status: 200,
                data: tasks
            })

        }catch(error) {
            console.log(error)
            next(error)
        }

    }

    static async getEvent(req, res, next) {

        const planId = req.query.plan_id
        const eventRepository = AppDataSource.getRepository(Event)

        try{

            const events = await eventRepository.find({
                where: {
                    plan: {
                        id: planId
                    }
                }
            })

            return res.json({
                status: 200,
                data: events
            })

        }catch(error) {
            console.log(error)
            next(error)
        }

    }

}

