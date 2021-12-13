import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {


  // creating instace logger
  // provide first argument as context
  // so when log are diplay is console thid context is shown
  // now we can call all logging methods
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);


  //const serverConfig = config.get('server');


  const port = 3000;
  await app.listen(port);
  // loging something after we start application
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
