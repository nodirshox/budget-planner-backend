import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator'

export class CreateWalletDto {
  @IsUUID()
  @ApiProperty({ description: 'Currency ID', example: 'uuid' })
  currencyId: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({ description: 'Wallet name', example: 'Main' })
  name: string
}
