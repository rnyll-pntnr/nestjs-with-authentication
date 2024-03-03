import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { MainModule } from './main.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger: Logger = new Logger('Application');

  try {
    const app = await NestFactory.create(MainModule);

    /**
     * Swagger Configuration
     */
    const swagConfig = new DocumentBuilder()
      .setTitle('Test Application')
      .setDescription('Test Application Description')
      .setVersion('1.0')
      .addServer('/api')
      .addBearerAuth(
        {
          name: 'Authorization',
          bearerFormat: 'Bearer',
          scheme: 'Bearer',
          type: 'http',
          in: 'header',
        },
        'JWT_TOKEN',
      )
      .build();

    const swagDoc = SwaggerModule.createDocument(app, swagConfig);
    SwaggerModule.setup('docs', app, swagDoc);

    app.setGlobalPrefix('api');
    await app.listen(parseInt(process.env.PORT ?? '4000'));
    logger.log(`App started on port: ${process.env.PORT ?? 4000}`);
  } catch (error) {
    logger.error(`Error: ${error.message || error}`);
    process.exit(1);
  }
}
bootstrap();
