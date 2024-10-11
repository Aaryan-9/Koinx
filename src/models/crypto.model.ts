import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class CryptoData {
  @Prop({ required: true })
  coin: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  marketCap: number;

  @Prop({ required: true })
  change24h: number;

  @Prop({ required: true, default: Date.now })
  timestamp: Date;
}

export const CryptoSchema = SchemaFactory.createForClass(CryptoData);
