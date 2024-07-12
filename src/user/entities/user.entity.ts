import { Todo } from "src/todo/entities/todo.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id:number
    
    @Column()
    firstName:string

    @Column()
    lastName:string

    @Column()
    email:string

    @Column()
    password:string

    @Column()
    role:string
    
    @OneToMany(() => Todo, todo => todo.user) // reference of the todo entity and 2nd one reverse to user entity
    todos: Todo[]  // here user can have multiple todos(collection of todo item)
}
