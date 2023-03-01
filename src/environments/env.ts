import { DevEnvironment } from "./dev.env";
import { ProddEnvironment } from "./prod.env";

export interface Environment{
    db_url: string,
    jwt_secret: string
}

export function getEnvironmentVariables(){
    if(process.env.NODE === 'production'){
        return ProddEnvironment
    }
    return DevEnvironment
}