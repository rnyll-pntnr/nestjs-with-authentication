import { Logger } from '@nestjs/common';
import { connect } from 'mongoose';

const logger = new Logger('Database');

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await connect(
        `${process.env.DB_STRING}/${process.env.DB_COLLECTION_NAME}`,
        {
          authSource: 'admin',
          user: `${process.env.DB_USERNAME}`,
          pass: `${process.env.DB_PASSWORD}`,
        },
      )
        .then(() => {
          logger.log(`DB Connected Successfully!`);
        })
        .catch((err) => {
          logger.error(`Failed to connect to DB: ${err.message}`);
          process.exit(1);
        }),
  },
];
