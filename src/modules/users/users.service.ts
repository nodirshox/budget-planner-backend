import { PrismaService } from '@/core/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    })
  }
}
