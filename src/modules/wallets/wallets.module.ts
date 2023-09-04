import { Module } from '@nestjs/common'
import { WalletsController } from '@/modules/wallets/wallets.controller'
import { WalletsService } from '@/modules/wallets/wallets.service'
import { CoreModule } from '@/core/core.module'

@Module({
  imports: [CoreModule],
  controllers: [WalletsController],
  providers: [WalletsService],
})
export class WalletsModule {}
