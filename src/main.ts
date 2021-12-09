import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
  .setTitle('wholesaler')
  .setDescription('wholesaler')
  .setVersion('1.0')
  .addTag('wholesaler')
  .addBearerAuth()
  .build();
  
const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('api/docs', app, document);
  await app.listen(3000);
}
bootstrap();
