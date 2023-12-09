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
import { LensPillarQuestion } from './lens-pillar-question'
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

  @ForeignKey(() => LensPillarQuestion)
  @Column(DataType.UUIDV4)
  pillarId?: string

  @ForeignKey(() => LensPillarRisk)
  @Column(DataType.UUIDV4)
  questionId?: string

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
