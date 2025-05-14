import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../../src/common/prisma.service';
import { ValidationService } from '../../src/common/validation.service';
import {
  LoginUserRequest,
  RegisterUserRequest,
  UserResponse,
} from '../../src/model/user.model';
import { Logger } from 'winston';
import * as bcrypt from 'bcrypt';
import { UserValidation } from './user.validation';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private readonly validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}
  async register(req: RegisterUserRequest): Promise<UserResponse> {
    this.logger.info(`User Request ${JSON.stringify(req)}`);

    const reqUserRequest = this.validationService.validate(
      UserValidation.REGISTER,
      req,
    );

    const existingUser = await this.prismaService.users.findUnique({
      where: { email: req.email },
    });

    if (existingUser) {
      throw new HttpException('Email is already exist', 400);
    }

    const user = await this.prismaService.users.create({
      data: {
        name: req.name,
        email: req.email,
        password: req.password,
        role_id: req.role_id,
        timeStamp: req.timeStamp,
      },
    });

    const isPasswordValid = await bcrypt.hash(
      reqUserRequest.password,
      10
    );

    return {
      name: user.name,
      email: user.password,
    };
  }

  async login(req: LoginUserRequest): Promise<UserResponse> {
    this.logger.info(`User Login ${JSON.stringify(req)}`);

    const reqUserLogin = this.validationService.validate(
      UserValidation.LOGIN,
      req,
    );

    let user = await this.prismaService.users.findUnique({
      where: {
        email: reqUserLogin.email,
      },
    });

    if (!user) {
      throw new HttpException('Username or Password is invalid', 401);
    }

    const isPasswordValid = await bcrypt.compare(
      reqUserLogin.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Username or Password is invalid', 401);
    }

    user = await this.prismaService.users.update({
      where: {
        email: reqUserLogin.email,
      },
      data: {
        token: uuid(),
      },
    });

    return {
      name: user.name,
      email: user.email,
      token: user.token!,
    };
  }
}
