import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

export const typeOrmConfig: SqliteConnectionOptions = {
  type: 'sqlite',
  database: '8percentDB',
  entities: [__dirname + '/../**/*.entity.{js, ts}'],
  synchronize: true,
  logging: true,
};
