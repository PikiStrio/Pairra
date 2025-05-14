import { Controller, Get, HttpCode } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { ItemService } from './item.service';

@Controller('api/items')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Get('')
  @HttpCode(200)
  async getItems() {
    const items = await this.itemService.getItems();
    return items;
  }
  
}
