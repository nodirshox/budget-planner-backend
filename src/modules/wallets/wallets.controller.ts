import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { WalletsService } from '@/modules/wallets/wallets.service'
import { CreateWalletDto } from '@/modules/wallets/dto/create-wallet.dto'
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard'
import { User } from '@/decorators/user.decorator'
import { IUser } from '@/modules/users/dto/user.interface'

@ApiTags('Wallet')
@ApiBearerAuth()
@Controller({ path: 'wallets', version: '1' })
export class WalletsController {
  constructor(private readonly service: WalletsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create wallet' })
  createWallet(@User() user: IUser, @Body() body: CreateWalletDto) {
    return this.service.createWallet(user.id, body)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get wallets' })
  getWallets(@User() user: IUser) {
    return this.service.getWallets(user.id)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get wallet' })
  getWallet(@User() user: IUser, @Param('id', ParseUUIDPipe) id: string) {
    return this.service.getWallet(user.id, id)
  }
}
