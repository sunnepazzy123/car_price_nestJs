import { CreateUserDto } from './dtos/create_user.dto';
import { UpdateUserDto } from './dtos/update_user.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { AuthService } from './auth/auth.service';
export declare class UsersController {
    private usersService;
    private authService;
    constructor(usersService: UsersService, authService: AuthService);
    whoAmI(user: User): Promise<User>;
    createUser(body: CreateUserDto, session: any): Promise<User>;
    signIn(body: CreateUserDto, session: any): Promise<User>;
    login(req: any): Promise<{
        access_token: string;
    }>;
    googleAuth(req: any): Promise<{
        access_token: string;
    }>;
    googleAuthRedirect(_: any): Promise<void>;
    getProfile(req: any): any;
    signOut(session: any): Promise<void>;
    findUsers(): Promise<User[]>;
    findUser(id: string): Promise<User>;
    updateUser(id: number, body: UpdateUserDto): Promise<User>;
    deleteUser(id: number): Promise<User>;
}
