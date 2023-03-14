import {
    PrimaryGeneratedColumn,
    Entity, 
    Column, 
    CreateDateColumn, 
    ManyToOne, 
} from "typeorm";
import { Group } from "./Friends";
import { User } from "./User";



@Entity()
export class Messages{
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.messages)
    user: User

    @Column({
        type: "text",
    })
    message_body: string

    @ManyToOne(()=> User, (user) => user.receiver, {
        nullable: true
    })
    receiver: User

    @ManyToOne(()=> Group, (group) => group.receiver_id, {
        nullable: true
    })
    group_receiver: Group

    @CreateDateColumn({
        type: "datetime",
    })
    created_at: Date

}