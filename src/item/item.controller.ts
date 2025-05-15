import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ItemService } from './item.service';
import { Users } from '@prisma/client';
import { Auth } from 'src/common/auth.decorator';

@Controller('api/items')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Get('')
  @HttpCode(200)
  async getItems() {
    const items = await this.itemService.getItems();
    return items;
  }

  @Post('/create')
  @HttpCode(200)
  async createItems(@Auth() user: Users){
    const items = await this.itemService.postItem(user);
    return items
  }
}
