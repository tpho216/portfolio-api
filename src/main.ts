import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ! need this to query data from another domain
  app.enableCors();

  const document = SwaggerModule.createDocument(app, new DocumentBuilder()
    .setTitle('Portfolio API')
    .setDescription('API for portfolio data queries').build());

  const PORT = 80;

  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT);
  console.log("App listening on port " + PORT);


}
bootstrap();
