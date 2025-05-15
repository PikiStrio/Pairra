import { Injectable, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { GetItemResponse } from '../model/item.model';
import { Logger } from 'winston';
import { Users } from '@prisma/client';

@Injectable()
export class ItemService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

  async getItems(): Promise<GetItemResponse[]> {
    const items = await this.prismaService.items.findMany();
    this.logger.info(
      `Get items all ${JSON.stringify(items)}`,
    );

    return items.map((item) => ({
      name: item.name,
      price: item.price,
      image: item.image!,
      timeStamp: item.timeStamp,
    }));
  }
  
  async postItem(user: Users) {
    this.logger.info(`POST ITEM REQUEST ${JSON.stringify}`)
    
  }
}
