import { AuthService } from './auth.service';
declare const LocalStrategyService_base: new (...args: any[]) => any;
export declare class LocalStrategyService extends LocalStrategyService_base {
    private authService;
    constructor(authService: AuthService);
    validate(email: string, password: string): Promise<any>;
}
export {};
