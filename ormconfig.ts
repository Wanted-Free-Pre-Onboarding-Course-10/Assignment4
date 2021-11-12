import dotenv from 'dotenv';
dotenv.config();

export = {
  type: 'sqlite',
  database: 'database.sqlite',
  // database: ':memory:',
  entities: [__dirname + '/../**/*.entity.{js, ts}'],
  synchronize: true,
  logging: false,
};