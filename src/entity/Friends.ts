import {
    JoinTable, 
    PrimaryGeneratedColumn,
    Entity, 
    OneToOne, 
    JoinColumn, 
    Column, 
    UpdateDateColumn, 
    CreateDateColumn, 
    ManyToMany, 
    ManyToOne, 
    OneToMany
} from "typeorm";
import { Messages } from "./Message";

import { User } from "./User";


@Entity()
export class Request {

    @PrimaryGeneratedColumn("increment")
    id: number

    @ManyToOne(()=> User, (user) => user.request_sender)
    requestSender: User

    @ManyToOne(()=> User, (user) => user.send_request_id)
    sendRequest: User

    @Column({
        nullable: true,
        default: null
    })
    response: String

    @CreateDateColumn({
        type: "datetime",
    })
    created_at: Date

    @UpdateDateColumn({
        type: "datetime",
    })
    updated_at: Date
}


@Entity()
export class Friends {

    @PrimaryGeneratedColumn("increment")
    id: number

    @ManyToOne(()=> User, (user) => user.friendsId)
    friends: User

    @CreateDateColumn({
        type: "datetime",
    })
    created_at: Date

}


@Entity()
export class Group{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @CreateDateColumn({
        type: "datetime",
    })
    created_at: Date

    @Column({
        type: "boolean",
        nullable: false,
        default: true
    })
    is_active: boolean

    @ManyToMany(()=> User, (users) => users.group )
    @JoinTable()
    users: User[]

    @OneToMany(()=> Messages, (messages)=> messages.group_receiver , {cascade:true})
    receiver_id: Messages[]

    @ManyToOne(()=> User, (user)=> user.group_admin_id)
    admin_id: User

}

