import { CanActivate, ExecutionContext } from "@nestjs/common/interfaces";
// import { Observable } from "rxjs";
import { Request } from "express";

export class RoleGuard implements CanActivate {
    private role:string

    constructor(role:string){
      this.role = role
    }
    canActivate(context: ExecutionContext) {
        const ctx = context.switchToHttp();
        const request:any = ctx.getRequest<Request>();
          if (this.role == request.user.role) {
            return true
          }else{
            false
          }
        }
}