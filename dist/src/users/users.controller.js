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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const serialize_interceptors_1 = require("../interceptors/serialize.interceptors");
const current_user_decorator_1 = require("./decorators/current-user.decorator");
const create_user_dto_1 = require("./dtos/create_user.dto");
const update_user_dto_1 = require("./dtos/update_user.dto");
const user_dto_1 = require("./dtos/user.dto");
const auth_guard_1 = require("./guards/auth.guard");
const jwt_auth_guard_1 = require("./strategy/jwt.auth.guard");
const local_auth_1 = require("./strategy/local.auth");
const google_auth_1 = require("./strategy/google.auth");
const users_entity_1 = require("./users.entity");
const users_service_1 = require("./users.service");
const auth_service_1 = require("./auth/auth.service");
let UsersController = class UsersController {
    constructor(usersService, authService) {
        this.usersService = usersService;
        this.authService = authService;
    }
    async whoAmI(user) {
        return user;
    }
    async createUser(body, session) {
        const user = await this.authService.signUp(body.email, body.password);
        session.userId = user.id;
        return user;
    }
    async signIn(body, session) {
        const user = await this.authService.signIn(body.email, body.password);
        session.userId = user.id;
        return user;
    }
    async login(req) {
        const token = await this.authService.generateToken(req.user);
        return token;
    }
    async googleAuth(req) {
        const token = await this.authService.generateToken(req.user);
        return token;
    }
    async googleAuthRedirect(_) {
    }
    getProfile(req) {
        return req.user;
    }
    async signOut(session) {
        session.userId = null;
    }
    findUsers() {
        const user = this.usersService.find();
        return user;
    }
    async findUser(id) {
        const user = await this.usersService.findOne(+id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    updateUser(id, body) {
        const user = this.usersService.update(id, body);
        return user;
    }
    deleteUser(id) {
        const user = this.usersService.remove(id);
        return user;
    }
};
__decorate([
    (0, common_1.Get)('/whoami'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_entity_1.User]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "whoAmI", null);
__decorate([
    (0, common_1.Post)('/signUp'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('/signIn'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signIn", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_1.LocalAuthGuard),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(google_auth_1.GoogleAuthGuard),
    (0, common_1.Get)('/google/redirect'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.UseGuards)(google_auth_1.GoogleAuthGuard),
    (0, common_1.Get)('/google'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "googleAuthRedirect", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('/signOut'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signOut", null);
__decorate([
    (0, common_1.Get)('/users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findUsers", null);
__decorate([
    (0, common_1.Get)('/users/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findUser", null);
__decorate([
    (0, common_1.Put)('/users/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)('/users/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deleteUser", null);
UsersController = __decorate([
    (0, common_1.Controller)('/auth'),
    (0, serialize_interceptors_1.Serialize)(user_dto_1.UserDto),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map