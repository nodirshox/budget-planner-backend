import { PrismaService } from '@/core/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CurrencyService {
  constructor(private readonly prisma: PrismaService) {}

  async getCurrencies() {
    const currencies = await this.prisma.currency.findMany()
    return { currencies }
  }
}
