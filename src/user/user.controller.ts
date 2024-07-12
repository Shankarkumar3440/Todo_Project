import { Controller, Get, Post, Body, Patch, Param, Delete,ValidationPipe, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/Auth/guard/jwt.guard';
import { RoleGuard } from 'src/Auth/guard/role.guard';
import { Constant } from 'src/util/constant';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
// import { validatetionPipe } from 'class-validator';

@ApiTags('User')
// @UseGuards(JwtAuthGuard)
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {    
    return this.userService.create(createUserDto);
  }
  
  @ApiSecurity('jwt-auth')
  @Get()
  @UseGuards(new RoleGuard(Constant.ROLES.ADMIN_ROLE))
  findAll(@Req() req: any) {
    console.log(req.user);
    return this.userService.findAll();
  }

  @ApiSecurity('jwt-auth')
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @ApiSecurity('jwt-auth')
  @Get(':email')
  findOneByEmail(@Param('email') email: string) {   
    return this.userService.findOneByEmail(email);
  }
  
  @ApiSecurity('jwt-auth')
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiSecurity('jwt-auth')
  @Delete(':id')
  @UseGuards(new RoleGuard(Constant.ROLES.ADMIN_ROLE))
  remove(@Param('id') id: string, @Req() req: any) {
    console.log(req.user);
    return this.userService.deleteUser(+id);
  }
}
