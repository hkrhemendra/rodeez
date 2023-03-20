import {Relation, PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn, Column, UpdateDateColumn, CreateDateColumn, OneToMany, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import { Messages } from "./Message"
import { Friends, Group, Request } from "./Friends"
import { User } from "./User"


type Time = string;

@Entity()
export class Plan {

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column()
    name: string

    @Column({
        nullable: true
    })
    photo: string

    @Column({
        nullable: true
    })
    file_attachment: string

    @Column({
        type: 'text'
    })
    description: string

    @Column({
        type: 'text'
    })
    start_location: string

    @Column({
        type: 'text'
    })
    final_location: string

    @Column({
        type: 'date'
    })
    start_date: Date

    @Column({
        type: 'date'
    })
    end_date: Date

    @CreateDateColumn({
        type: "datetime",
    })
    created_at: Date

    @UpdateDateColumn({
        type: "datetime",
    })
    updated_at: Date

    @OneToMany(() => User, (user) => user.plan)
    users: User[]

    @OneToMany(() => User, (user) => user.plan_admin)
    admin: User[]

    @OneToMany(() => Task, (task) => task.plan)
    task: Task[]

    @OneToMany(() => Event, (event) => event.plan)
    event: Event[]
}

@Entity()
export class Task {

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({
        type: 'text'
    })
    description: string

    @Column({
        type: 'date'
    })
    task_date: Date

    @Column({
        type: 'time'
    })
    time: Time

    @CreateDateColumn({
        type: "datetime",
    })
    created_at: Date

    @ManyToOne(() => Plan, (plan) => plan.task)
    plan: Plan

}

@Entity()
export class Event {

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({
        type: 'text'
    })
    description: string

    @Column({
        type: 'date'
    })
    event_date: Date

    @Column({
        type: 'time'
    })
    start_time: Time

    @Column({
        type: 'time'
    })
    end_time: Time

    @Column({
        nullable: true
    })
    attachment: string

    @CreateDateColumn({
        type: "datetime",
    })
    created_at: Date

    @ManyToOne(() => Plan, (plan) => plan.event)
    plan: Plan

}