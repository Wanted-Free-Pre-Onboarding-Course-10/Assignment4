import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Connection, QueryRunner } from 'typeorm';
import * as faker from 'faker';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let queryRunner: QueryRunner;
  let accessToken: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const dbConnection = moduleFixture.get(Connection);

    queryRunner = dbConnection.createQueryRunner('master');

    if (!accessToken) {
      const result = await request(app.getHttpServer())
        .post('/auth/sign-in')
        .send({
          email: 'test@gmail.com',
          password: 'wecode1234',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);
      accessToken = result.body.data.accessToken;
    }

    await queryRunner.startTransaction();
  });

  afterEach(async () => {
    await queryRunner.rollbackTransaction();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('auth', () => {
    it('/user/signup (POST)', async () => {
      // given
      // when
      const result = await request(app.getHttpServer())
        .post('/auth/sign-up')
        .send({
          email: faker.internet.email(),
          nickname: faker.internet.userName(),
          password: faker.internet.password(),
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);

      // then
      expect(result.body.success).toBeTruthy();
    });
  });
});
