import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users.service';
import { LoginDto } from '../dtos/login.dto';
export declare class AuthService {
    private jwtService;
    private userService;
    constructor(jwtService: JwtService, userService: UsersService);
    signUp(email: string, password: string): Promise<import("../users.entity").User>;
    signIn(email: string, password: string): Promise<import("../users.entity").User>;
    validateUser(email: string, password: string): Promise<any>;
    generateToken(user: LoginDto): Promise<{
        access_token: string;
    }>;
}
