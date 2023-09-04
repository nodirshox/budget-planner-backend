import { UserRole } from '@prisma/client'

export interface IUser {
  id: string
  role: UserRole
}
