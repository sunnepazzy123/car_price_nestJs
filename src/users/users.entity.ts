import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove, BeforeInsert } from "typeorm";
import { Exclude } from "class-transformer"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    
    @Column()
    @Exclude()
    password: string;

    @BeforeInsert() 
    beforeInsert() {
        console.log("Before Insert")
    }

    @AfterInsert()
    logInsert(){
        console.log("Inserted User id ", this.id)
    }

    @AfterUpdate()
    logUpdate(){
        console.log("Update User id ", this.id)
    }

    @AfterRemove()
    logDelete(){
        console.log("Remove User id", this.id)
    }
}