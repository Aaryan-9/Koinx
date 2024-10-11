import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CryptoData } from '../models/crypto.model';
import { Cron } from '@nestjs/schedule';
import { CoinTypeEnum } from './enum/coins';
import { CoinStatsDto } from './dto/crypto.dto';

@Injectable()
export class ApiService {
  logger: Logger;
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(CryptoData.name)
    private readonly cryptoDataModel: Model<CryptoData>,
  ) {
    this.logger = new Logger(ApiService.name);
  }

  // Task 1

  @Cron('0 */2 * * *')
  async fetchAndStoreCryptoData() {
    const coins: CoinTypeEnum[] = [
      CoinTypeEnum.BITCOIN,
      CoinTypeEnum.MATIC_NETWORK,
      CoinTypeEnum.ETHEREUM,
    ];

    for (const coin of coins) {
      const stats = await this.getStats(coin);
      if ('error' in stats) {
        this.logger.error(`Error fetching data for ${coin}: ${stats.error}`);
        continue;
      }
      await this.saveCryptoData({ ...stats, coin });
    }
  }

  async saveCryptoData(data: any) {
    const newCryptoData = new this.cryptoDataModel({
      coin: data.coin,
      price: data.price,
      marketCap: data.marketCap,
      change24h: data['24hChange'],
      timestamp: new Date(),
    });
    await newCryptoData.save();
    this.logger.log(`Saved data for ${data.coin}`);
  }

  // Task 2

  async getStats(
    coin: CoinTypeEnum,
  ): Promise<CoinStatsDto | { error: string }> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`https://api.coingecko.com/api/v3/coins/markets`, {
          params: {
            vs_currency: 'usd',
            ids: coin,
          },
        }),
      );
      const coinData = response.data[0];
      return {
        price: coinData.current_price,
        marketCap: coinData.market_cap,
        '24hChange': coinData.price_change_percentage_24h,
      };
    } catch (error) {
      this.logger.error('Error fetching data from CoinGecko:', error);
      return { error: 'Failed to fetch coin data' };
    }
  }

  // Task 3

  async calculateStandardDeviation(
    coin: CoinTypeEnum,
  ): Promise<number | { error: string }> {
    try {
      const records = await this.cryptoDataModel
        .find({ coin })
        .sort({ timestamp: -1 })
        .limit(100)
        .select('price');

      if (records.length === 0) {
        return { error: 'No records found for the specified coin' };
      }

      const prices = records.map((record) => record.price);

      const deviation = this.calculateStandardDeviationHelper(prices);

      return Number(deviation.toFixed(2));
    } catch (error) {
      this.logger.error('Error calculating standard deviation:', error);
      return { error: 'Failed to calculate standard deviation' };
    }
  }

  private calculateStandardDeviationHelper(values: number[]): number {
    const n = values.length;
    if (n === 0) return 0;

    const mean = values.reduce((sum, value) => sum + value, 0) / n;
    const squaredDifferences = values.map((value) => Math.pow(value - mean, 2));
    const variance =
      squaredDifferences.reduce((sum, value) => sum + value, 0) / n;

    return Math.sqrt(variance);
  }
}
