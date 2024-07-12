import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Constant } from 'src/util/constant';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRespository: Repository<User>) {}

  create(createUserDto: CreateUserDto) {
    let user:User = new User();
    user.firstName = createUserDto.firstName;//  user.firstName   =  
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.role = Constant.ROLES.NORMAL_ROLE;
    return this.userRespository.save(user);       
  }

  findAll() {
    return this.userRespository.find()
  }

  findOne(id: number) {
    return this.userRespository.findOne({where:{id:id}});
  }

  findOneByEmail(email: string) {
    return this.userRespository.findOne({where:{email:email}});
    
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
     const user:User = await this.findOne(id)
     if (!user) {
       throw new Error('User not found');
     }else{
       return this.userRespository.save(updateUserDto);
     }
  }

    async deleteUser(id: number) {
    const result = await this.userRespository.delete(id)

    if(result.affected === 0) { 
      throw new Error('User not found');
  }
    return "User Deleted Succssfull"
  }
}
