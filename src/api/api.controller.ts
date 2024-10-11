import { Controller, Get, Query } from '@nestjs/common';
import { ApiService } from './api.service';
import { CoinTypeEnum } from './enum/coins';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('stats')
  async getStats(@Query('coin') coin: string) {
    const allowedCoins: CoinTypeEnum[] = [
      CoinTypeEnum.BITCOIN,
      CoinTypeEnum.MATIC_NETWORK,
      CoinTypeEnum.ETHEREUM,
    ];
    if (!allowedCoins.includes(coin as CoinTypeEnum)) {
      return { error: 'Invalid coin' };
    }
    const stats = await this.apiService.getStats(coin as CoinTypeEnum);
    return stats;
  }

  @Get('/deviation')
  async getStandardDeviation(@Query('coin') coin: string) {
    const allowedCoins: CoinTypeEnum[] = [
      CoinTypeEnum.BITCOIN,
      CoinTypeEnum.MATIC_NETWORK,
      CoinTypeEnum.ETHEREUM,
    ];
    if (!allowedCoins.includes(coin as CoinTypeEnum)) {
      return { error: 'Invalid coin' };
    }

    const deviation = await this.apiService.calculateStandardDeviation(
      coin as CoinTypeEnum,
    );
    
    return { deviation };
  }
}
