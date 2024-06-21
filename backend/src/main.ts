import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as oracledb from 'oracledb';

async function bootstrap() {
  // Set the location of the tnsnames.ora file
  // oracledb.initOracleClient({ libDir: './tnsnames.oca' });

  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  const port = process.env.PORT || 3000;

  // Configure Oracle Database connection
  // oracledb.createPool({
  //   user: 'your_username',
  //   password: 'your_password',
  //   connectString: 'ACME' // Use the alias from tnsnames.ora
  // });

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();