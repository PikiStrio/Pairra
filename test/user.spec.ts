import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { AppModule } from './../src/app.module';
import { TestService } from './test.service';
import { TestModule } from './test.module';

describe('UserController', () => {
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

  describe('/api/users/login', () => {
    beforeEach(async () => {
      await testService.deleteUser();
      await testService.createUser();
    });
    it('should be able to login ', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'test@test.com',
          password: 'test',
        });
      logger.info('LOGGER LOGIN SUCCESS: ' + JSON.stringify(response.body));

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.token).toBeDefined();
    });
    it('should be error validation ', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({
          email: '',
          password: '',
        });

      logger.info(
        'LOGGER LOGIN ERROR VALIDATION: ' + JSON.stringify(response.body),
      );

      expect(response.status).toBe(400);
      expect(response.error).toBeDefined();
    });

    it('should be error email or password ', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'test@gmail.com',
          password: 'asdfadsf',
        });

      logger.info(
        'ERROR LOGIN EMAIL OR PASSWORD WRONG: ' + JSON.stringify(response.body),
      );

      expect(response.status).toBe(401);
      expect(response.error).toBeDefined();
    });
  });

  describe('POST /api/users/create', () => {
    beforeEach(async () => {
      await testService.deleteUser();
    });
    it('should be able to create ', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/create')
        .send({
          name: 'test',
          email: 'test2@test.com',
          password: 'test',
          role_id: 1,
          timeStamp: new Date(),
        });

      logger.info('REGISTER USER SUCCESS: ' + JSON.stringify(response.body));

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it('should be error validation ', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/create')
        .send({
          email: '',
          password: '',
        });

      logger.info(
        'LOGGER REGISTER ERROR VALIDATION: ' + JSON.stringify(response.body),
      );

      expect(response.status).toBe(400);
      expect(response.error).toBeDefined();
    });

    it('should be error email already exist ', async () => {
      await request(app.getHttpServer()).post('/api/users/create').send({
        name: 'test',
        email: 'test2@test.com',
        password: 'test',
        role_id: 1,
        timeStamp: new Date(),
      });
      
      const response = await request(app.getHttpServer())
        .post('/api/users/create')
        .send({
          name: 'test',
          email: 'test2@test.com',
          password: 'test',
          role_id: 1,
          timeStamp: new Date(),
        });

      logger.info(
        'ERROR REGISTER EMAIL ALREADY EXIST: ' + JSON.stringify(response.body),
      );

      expect(response.status).toBe(400);
      expect(response.error).toBeDefined();
    });
  });
});
