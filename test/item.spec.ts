import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { AppModule } from './../src/app.module';
import { TestService } from './test.service';
import { TestModule } from './test.module';

describe('ItemController', () => {
  let app: INestApplication;
  let logger: Logger;
  let testService: TestService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER);
    testService = app.get(TestService);
  });
  afterAll(async () => {
    await app.close();
  });

  describe('/api/items', () => {
    beforeEach(async () => {
        await testService.createItems()
    })
    it('should be able to getItems ', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/items')

      logger.info('GET ITEMS SUCCESS: ' + JSON.stringify(response.body));

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });
  });
});
