import {
  Table,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Column,
  PrimaryKey,
  DataType,
  ForeignKey,
  AutoIncrement,
  NotEmpty,
  Min,
  Max,
  AllowNull,
  Default
} from 'sequelize-typescript'
import { LensPillar } from '..'
import { columns } from '@/app/dashboard/solutions/components/data'

export interface LensPillarResourceAttributes {
  id: string
  lensPillarId?: string
  description: string
  url?: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export type LensPillarResourceCreationAttributes = Omit<
  LensPillarResourceAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

@Table({
  tableName: 'lenses-pillars-resources'
})
export class LensPillarResource extends Model<
  LensPillarResourceAttributes,
  LensPillarResourceCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: string

  @ForeignKey(() => LensPillar)
  @Column
  lensPillarId?: bigint

  @NotEmpty
  @Column
  description!: string

  @AllowNull
  @Column
  url?: string

  @CreatedAt
  @Column
  createdAt?: Date

  @UpdatedAt
  @Column
  updatedAt?: Date

  @DeletedAt
  @Column
  deletedAt?: Date
}
