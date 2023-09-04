import { Module } from '@nestjs/common'
import { CurrencyService } from '@/modules/currency/currency.service'
import { CurrencyController } from '@/modules/currency/currency.controller'
import { CoreModule } from '@/core/core.module'

@Module({
  imports: [CoreModule],
  providers: [CurrencyService],
  controllers: [CurrencyController],
})
export class CurrencyModule {}
