import { Body, Controller, HttpCode, Post, Put } from '@nestjs/common';
import {
  LoginUserRequest,
  RegisterUserRequest,
  UserResponse,
} from '../model/user.model';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/login')
  @HttpCode(200)
  async login(@Body() req: LoginUserRequest): Promise<UserResponse> {
    const result = await this.userService.login(req);
    return result;
  }

  @Post('/create')
  @HttpCode(200)
  async register(@Body() req: RegisterUserRequest): Promise<UserResponse> {
    const result = await this.userService.register(req);
    return result;
  }
}
