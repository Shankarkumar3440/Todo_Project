import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Constant } from "src/util/constant";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    console.log(request.url);
     
    for (let i = 0; i < Constant.BY_PASS_URLS.length; i++) {
      if (request.url == Constant.BY_PASS_URLS[i]) {
        return true; // Bypass the authentication for specific URLs
      }
    }
   
      //  throw new Error("User not found");
   

    return super.canActivate(context); 
    
  }
}
