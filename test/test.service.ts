import { Injectable } from '@nestjs/common';
import { PrismaService } from '../src/common/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TestService {
  constructor(private prismaService: PrismaService) {}

  async createUser() {
    const hashedPassword = await bcrypt.hash('test', 10);
    await this.prismaService.users.create({
      data: {
        name: 'test',
        email: 'test@test.com',
        password: hashedPassword,
        role_id: 1,
        timeStamp: new Date()
      },
    });
  }

  async deleteUser() {
    await this.prismaService.users.deleteMany({
      where: {
        name: 'test',
      }
    })
  }
}
