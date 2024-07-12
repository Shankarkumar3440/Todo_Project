import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';


@Injectable()
export class TodoService {
 
  constructor(
    @InjectRepository(Todo) 
    private readonly todoRepository: Repository<Todo>,
    private readonly userService: UserService
  ) {}
  
  async create(createTodoDto: CreateTodoDto, userId: number) {
    const todo = new Todo();
    todo.title = createTodoDto.title;
    todo.date = new Date().toLocaleString();
    todo.completed = true;
    todo.user= await this.userService.findOne(userId);
    return this.todoRepository.save(todo);
  }  

  findAll() {
    return this.todoRepository.find();
  }

  findOne(userId: number) {
    return this.todoRepository.findOne({
      relations: ['user'], // load the user relation
      where:{user:{id:userId},completed:true} //here use user and check id with userId
    })
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const user:Todo = await this.findOne(id)
    if (!user) {
      throw new Error('User not found');
    }else{
      return this.todoRepository.save(updateTodoDto);
    }
  }

  async remove(id: number) {
    const result = await this.todoRepository.delete(id)

    if(result.affected === 0) { 
      throw new Error('User not found');
  }
    return "User Deleted Succssfull"
  }
}
