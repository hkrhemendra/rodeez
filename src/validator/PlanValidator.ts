import{
    body, check, query
} from 'express-validator';
import { isDate } from 'util/types';
import { AppDataSource } from '../data-source';
import { Plan } from '../entity/Plans';
import { User } from '../entity/User';
import { ValidatorUtils } from '../utils/Validate';


export class PlanValidator {

    static createPlan(){
        const userRepository = AppDataSource.getRepository(User);
        return [
            body('plan_name','Plan name is required').isString(),
            body('photo_link', 'Photo Link is required').isURL(),
            body('description', 'Please describe the plane').isString(),
            body('attachment', 'Attachement is required').isURL(),
            body('start_date', 'correct format for start_date is "YYYY/MM/DD"').isDate(),
            body('start_location', 'Start location missing').isString(),
            body('final_location', 'Final location missing').isString(),
            body('end_date', 'correct format for end_date is "YYYY/MM/DD"').isDate(),
            body('user_array', 'Please provide user id array for members')
                .custom(async(user_array, {req})=>{
                    let checkUsers = await ValidatorUtils.validateUserArray(user_array);
                    user_array = JSON.parse(user_array)
                    if(Array.isArray(checkUsers)){
                        return new Error(`following user ids are not valid ${checkUsers}`)
                    }else{
                        return true
                    }

                })
        ]
    }

    static createTask(){
        const planRepository = AppDataSource.getRepository(Plan)
        return [
            body('plan_id', 'Task ID is missing').isNumeric()
                .custom(async(plan_id, {req}) => {
                    return await planRepository.findOneBy({
                        id: plan_id
                    }).then((plan) => {
                        if(plan){
                            return true
                        }else {
                            return new Error('Plan ID is invalid Please check it again. ')
                        }
                    })
                }),

            body('date', 'correct format of date is "YYYY/MM/DD"').isDate(),
            body('time', 'correct format for time is "HH:mm:ss"')
                .custom((time, {req}) => {
                    let pattern = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/
                    if(pattern.test(time)){
                        return true
                    }else{
                        return false
                    }
                }),
            body('description', 'Please add a valid description of task').isString()
        ]
    }

    static createEvent(){
        const planRepository = AppDataSource.getRepository(Plan)
        return [
            body('plan_id', 'Task ID is missing').isNumeric()
                .custom(async(plan_id, {req}) => {
                    return await planRepository.findOneBy({
                        id: plan_id
                    }).then((plan) => {
                        if(plan){
                            return true
                        }else {
                            return new Error('Plan ID is invalid Please check it again. ')
                        }
                    })
                }),

            body('date', 'correct format of date is "YYYY/MM/DD"').isDate(),
            body('start_time', 'correct format for time is "HH:mm:ss"')
                .custom((time, {req}) => {
                    let pattern = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/
                    if(pattern.test(time)){
                        return true
                    }else{
                        return false
                    }
                }),
            body('start_time', 'correct format for time is "HH:mm:ss"')
                .custom((time, {req}) => {
                    let pattern = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/
                    if(pattern.test(time)){
                        return true
                    }else{
                        return false
                    }
                }),
            body('description', 'Please add a valid description of task').isString(),
        ]
    }

}