import { group } from "console"
import {Relation, PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn, Column, UpdateDateColumn, CreateDateColumn, OneToMany, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import { Messages } from "./Message"
import { Friends, Group, Request } from "./Friends"
import { request } from "http"


@Entity()
export class User {

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column({
        nullable: true
    })
    avatar: string

    @Column("varchar", { length: 500, nullable: true })
    about: string

    @Column({
        unique:true
    })
    email: string

    @Column({
        unique: true
    })
    phone: string

    @Column()
    password: string

    @Column({
        default: false
    })
    is_admin: boolean

    @Column({
        default: false
    })
    verified: boolean

    @Column({
        default: false
    })
    is_google: boolean

    @CreateDateColumn({
        type: "datetime",
    })
    created_at: Date

    @UpdateDateColumn({
        type: "datetime",
    })
    updated_at: Date

    // Token
    @OneToOne(()=> Token, (token)=> token.user)
    metadata: Relation<Token>

    // Messages
    @OneToMany(()=> Messages, (messages)=> messages.user, {cascade:true})
    messages: Messages[]

    @OneToMany(()=> Messages, (messages)=> messages.user, {cascade:true})
    receiver: Messages[]

    // Group
    @OneToMany(() => Group, (group) => group.admin_id, {cascade:true})
    group_admin_id: Group[]

    @ManyToMany(() => Group, (group) => group.users)
    group: Group[]

    // Request
    @OneToMany(() => Request, (request) => request.requestSender, {cascade:true})
    request_sender: Request[]

    @OneToMany(() => Request, (request) => request.sendRequest, {cascade:true})
    send_request_id: Request[]

    //Friends

    @OneToMany(() => Friends, (friends) => friends.friends, {cascade:true})
    friendsId: Request[]
    
}

@Entity()
export class Token{
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(()=> User, (user)=> user.metadata)
    @JoinColumn()
    user: Relation<User>

    @Column({
        nullable: true
    })
    verification_token: number

    @Column({
        type: "datetime",
        nullable: true
    })
    verification_token_time: Date

    @Column({
        nullable: true
    })
    reset_password_token: number

    @Column({
        type: "datetime",
        nullable: true
    })
    reset_password_token_time: Date

    @CreateDateColumn({
        type: "datetime",
    })
    created_at: Date

    @UpdateDateColumn({
        type: "datetime",
    })
    updated_at: Date
}

