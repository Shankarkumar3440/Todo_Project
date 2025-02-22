import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";
import { LoginDto } from "../dto/login.dto";


// @ApiTags('Auth')
// @UseGuards(JwtAuthGuard)

@Controller('/auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @ApiTags('Auth')
  @Post('/login')
  @UseGuards(AuthGuard('local'))
  login(@Req() req , @Body() loginDto: LoginDto) {
    const user: User = req.user;
    console.log(user);
    
    const payload = { 
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,  
      email: user.email,
      role: user.role,
     };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
