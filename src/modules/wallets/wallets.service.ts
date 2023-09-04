import { PrismaService } from '@/core/prisma/prisma.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateWalletDto } from '@/modules/wallets/dto/create-wallet.dto'
import { Prisma } from '@prisma/client'
import { MAXIMUM_WALLETS } from '@/consts/maximum-wallets'

@Injectable()
export class WalletsService {
  constructor(private readonly prisma: PrismaService) {}

  async createWallet(userId: string, body: CreateWalletDto) {
    const existingCurrency = await this.prisma.currency.count({
      where: {
        id: body.currencyId,
      },
    })

    if (existingCurrency === 0) {
      throw new BadRequestException(
        `Currency with id=${body.currencyId} not found`,
      )
    }
    const existingWalletsCount = await this.prisma.wallet.count({
      where: { userId },
    })

    if (existingWalletsCount >= MAXIMUM_WALLETS) {
      throw new BadRequestException('Maximum wallets count exceeded')
    }
    const data: Prisma.WalletCreateInput = {
      name: body.name,
      user: {
        connect: {
          id: userId,
        },
      },
      currency: {
        connect: {
          id: body.currencyId,
        },
      },
    }

    return this.prisma.wallet.create({ data })
  }

  async getWallets(userId: string) {
    const wallets = await this.prisma.wallet.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        currency: true,
      },
    })
    return { wallets, count: wallets.length }
  }

  async getWallet(userId: string, walletId: string) {
    const wallet = await this.prisma.wallet.findUnique({
      where: {
        id: walletId,
        userId,
      },
      include: {
        currency: true,
      },
    })

    if (!wallet) {
      throw new BadRequestException(`Wallet with id=${walletId} not found`)
    }

    return wallet
  }
}
