import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    ApiModule,
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGO_URI as string,
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
