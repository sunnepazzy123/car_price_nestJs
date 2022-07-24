import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptors';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dtos/create_user.dto';
import { TokenDto } from './dtos/token.dto';
import { UpdateUserDto } from './dtos/update_user.dto';
import { UserDto } from './dtos/user.dto';
import { AuthGuard } from './guards/auth.guard';
import { JwtAuthGuard } from './strategy/jwt.auth.guard';
import { LocalAuthGuard } from './strategy/local.auth';
import { GoogleAuthGuard } from './strategy/google.auth';
import { User } from './users.entity';
import { UsersService } from './users.service';



@Controller('/auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/whoami')
  @UseGuards(AuthGuard)
  async whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signUp')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signUp(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signIn')
  async signIn(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signIn(body.email, body.password);
    session.userId = user.id;
    return user;
  }
  
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req) {
    const token = await this.authService.generateToken(req.user)
    return token
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/google/redirect')
  async googleAuth(@Req() req) {
    const token = await this.authService.generateToken(req.user)
    return token;
  }

  
  @UseGuards(GoogleAuthGuard)
  @Get('/google')
  async googleAuthRedirect(@Req() _) {
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @Post('/signOut')
  async signOut(@Session() session: any) {
    session.userId = null;
  }

  @Get('/users')
  findUsers(@Query('email') email: string) {
    const user = this.usersService.find(email);
    return user;
  }
  

  // @UseInterceptors(new CustomSerializerInterceptor(UserDto))
  @Get('/users/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Put('/users/:id')
  updateUser(@Param('id') id: number, @Body() body: UpdateUserDto) {
    const user = this.usersService.update(id, body);
    return user;
  }

  @Delete('/users/:id')
  deleteUser(@Param('id') id: number) {
    const user = this.usersService.remove(id);
    return user;
  }
}
