import { IsNumber } from 'class-validator';

export class CoinStatsDto {
  @IsNumber()
  price: number;

  @IsNumber()
  marketCap: number;

  @IsNumber()
  '24hChange': number;
}
