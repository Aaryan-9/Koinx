import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { CryptoData, CryptoSchema } from '../models/crypto.model';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: CryptoData.name, schema: CryptoSchema },
    ]),
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
