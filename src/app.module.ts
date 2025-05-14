import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [CommonModule, UserModule, ItemModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
