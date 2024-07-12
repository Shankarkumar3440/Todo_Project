import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from 'src/Auth/guard/jwt.guard';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/Auth/guard/role.guard';
import { Constant } from 'src/util/constant';


@ApiTags('Todo')
@ApiSecurity('jwt-auth')
@Controller('/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('/create/:userId')
  create(@Body() createTodoDto: CreateTodoDto , @Param('userId') userId: number) {
    return this.todoService.create(createTodoDto , userId);
  }

  @Get()
  // @UseGuards(new RoleGuard(Constant.ROLES.ADMIN_ROLE))
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':userId')
    @UseGuards(new RoleGuard(Constant.ROLES.ADMIN_ROLE))
  findOne(@Param('userId') userId: number) {
    return this.todoService.findOne(Number(userId));
  }
  @Patch(':userId')
  // @UseGuards(new RoleGuard(Constant.ROLES.ADMIN_ROLE))
  update(@Param('userId') userId: number, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(Number(userId), updateTodoDto);
  }

  @Delete(':id')
  @UseGuards(new RoleGuard(Constant.ROLES.ADMIN_ROLE))
  remove(@Param('id') id: number) {
    return this.todoService.remove(id);
  }
}
