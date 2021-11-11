import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

export const typeOrmConfig: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'eight',
  entities: [__dirname + '/../**/*.entity.{js, ts}'],
  synchronize: true,
};
