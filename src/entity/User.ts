import { group } from "console"
import {Relation, PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn, Column, UpdateDateColumn, CreateDateColumn, OneToMany, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import { Messages } from "./Message"
import { Friends, Group, Request } from "./Friends"
import { request } from "http"
import { Plan } from "./Plans"


@Entity()
export class User {

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column()
    first_name: string

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
        unique: true,
        nullable: true,
    })
    phone: string

    @Column({
        nullable: true
    })
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

    // Plan
    @ManyToOne(() => Plan, (plan) => plan.users)
    plan: Plan

    @ManyToOne(() => Plan, (plan) => plan.admin)
    plan_admin: Plan
    
}

@Entity()
export class Subscribers {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        default: false
    })
    subscribed: boolean

    @Column({
        type: "datetime",
        nullable: true
    })
    end_at: Date

    @CreateDateColumn({
        type: "datetime",
    })
    created_at: Date

    @UpdateDateColumn({
        type: "datetime",
    })
    updated_at: Date

    // Users One to One
    @OneToOne(() => User)
    @JoinColumn()
    user: User
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
    otp: number

    @Column({
        type: "datetime",
        nullable: true
    })
    otp_time: Date

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

