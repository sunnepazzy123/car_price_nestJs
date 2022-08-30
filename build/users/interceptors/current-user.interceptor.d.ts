import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { UsersService } from '../users.service';
export declare class CurrentUserInterceptor implements NestInterceptor {
    private userService;
    constructor(userService: UsersService);
    intercept(context: ExecutionContext, handler: CallHandler<any>): Promise<import("rxjs").Observable<any>>;
}
