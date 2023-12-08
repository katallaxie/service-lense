import {
  Table,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Column,
  PrimaryKey,
  DataType,
  ForeignKey
} from 'sequelize-typescript'
import { Lens } from './lens'
import { LensPillar } from './lens-pillar'

export interface LensPillarsAttributes {
  id: string
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export type LensPillarsCreationAttributes = Omit<
  LensPillarsAttributes,
  'createdAt' | 'updatedAt' | 'deletedAt'
>

@Table({
  tableName: 'lens-pillars'
})
export class LensPillars extends Model<
  LensPillarsAttributes,
  LensPillarsCreationAttributes
> {
  @PrimaryKey
  @Column(DataType.UUIDV4)
  id!: string

  @ForeignKey(() => LensPillar)
  @Column(DataType.UUIDV4)
  pillarId?: string

  @ForeignKey(() => Lens)
  @Column(DataType.UUIDV4)
  lensId?: string

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
