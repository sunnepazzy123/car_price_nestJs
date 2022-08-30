"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const util_1 = require("util");
const crypto_1 = require("crypto");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users.service");
const scrypt = (0, util_1.promisify)(crypto_1.scrypt);
let AuthService = class AuthService {
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async signUp(email, password) {
        const users = await this.userService.find(email);
        if (users.length) {
            throw new common_1.BadRequestException('User already exist');
        }
        const salt = (0, crypto_1.randomBytes)(8).toString('hex');
        const hash = (await scrypt(password, salt, 32));
        const hashSaltedPassword = salt + '.' + hash.toString('hex');
        const user = await this.userService.create(email, hashSaltedPassword);
        return user;
    }
    async signIn(email, password) {
        const [user] = await this.userService.find(email);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const [salt, storedHash] = user.password.split('.');
        const hash = (await scrypt(password, salt, 32));
        if (hash.toString('hex') !== storedHash) {
            throw new common_1.BadRequestException('Invalid credential');
        }
        return user;
    }
    async validateUser(email, password) {
        const [user] = await this.userService.find(email);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const [salt, storedHash] = user.password.split('.');
        const hash = (await scrypt(password, salt, 32));
        if (hash.toString('hex') !== storedHash) {
            throw new common_1.BadRequestException('Invalid credential');
        }
        return user;
    }
    async generateToken(user) {
        const payload = { email: user.email, password: user.password };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        users_service_1.UsersService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map