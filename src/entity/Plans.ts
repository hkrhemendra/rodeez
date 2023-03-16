import {Relation, PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn, Column, UpdateDateColumn, CreateDateColumn, OneToMany, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import { Messages } from "./Message"
import { Friends, Group, Request } from "./Friends"
import { User } from "./User"


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
        type: 'text'
    })
    description: string

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
}