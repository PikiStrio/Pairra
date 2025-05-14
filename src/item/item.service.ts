import { Injectable, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../../src/common/prisma.service';
import { GetItemResponse } from '../../src/model/item.model';
import { Logger } from 'winston';

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
  
}
