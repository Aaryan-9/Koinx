import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectToDatabase } from './config/database';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await connectToDatabase();
  await app.listen(3000);
}
bootstrap();
