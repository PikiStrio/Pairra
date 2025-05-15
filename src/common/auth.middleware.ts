import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from './prisma.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private prismaService: PrismaService) {}
  async use(req: any, res: Response, next: (error?: any) => void) {
    const token = req.headers.authorization;

    console.log(req);

    if (token) {
      const user = await this.prismaService.users.findFirst({
        where: {
          token: token,
        },
      });
      if (user) {
        req.user = user;
      }
    }
    next();
  }
}
