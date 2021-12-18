import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const {env} = process;
const result = require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ! need this to query data from another domain
  app.enableCors();

  const document = SwaggerModule.createDocument(app, new DocumentBuilder()
    .setTitle('Portfolio API')
    .setDescription('API for portfolio data queries').build());

  const PORT = env.APPSETTINGS_PORT;

  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT);
  console.log("App listening on port " + PORT);


}
bootstrap();
