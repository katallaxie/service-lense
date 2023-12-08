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
import { LensPillarChoices } from './lens-pillar-choices'
import { LensPillarRisk } from './lens-pillar-risk'

export interface LensPillarRisksAttributes {
  id: string
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export type LensPillarRisksCreationAttributes = Omit<
  LensPillarRisksAttributes,
  'createdAt' | 'updatedAt' | 'deletedAt'
>

@Table({
  tableName: 'lens-pillar-risks'
})
export class LensPillarRisks extends Model<
  LensPillarRisksAttributes,
  LensPillarRisksCreationAttributes
> {
  @PrimaryKey
  @Column(DataType.UUIDV4)
  id!: string

  @ForeignKey(() => LensPillarChoices)
  @Column(DataType.UUIDV4)
  lensPillarId?: string

  @ForeignKey(() => LensPillarRisk)
  @Column(DataType.UUIDV4)
  lensPillarChoice?: string

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
