import { Module } from '@nestjs/common';
import { TestService } from './test.service';

@Module({
  controllers: [],
  providers: [TestService],
})
export class TestModule {}
