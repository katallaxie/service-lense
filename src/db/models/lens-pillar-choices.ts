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
import { LensPillarChoice } from './lens-pillar-choice'
import { LensPillarQuestion } from './lens-pillar-question'

export interface LensPillarChoicesAttributes {
  id: string
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export type LensPillarChoicesCreationAttributes = Omit<
  LensPillarChoicesAttributes,
  'createdAt' | 'updatedAt' | 'deletedAt'
>

@Table({
  tableName: 'lens-pillar-choices'
})
export class LensPillarChoices extends Model<
  LensPillarChoicesAttributes,
  LensPillarChoicesCreationAttributes
> {
  @PrimaryKey
  @Column(DataType.UUIDV4)
  id!: string

  @ForeignKey(() => LensPillarQuestion)
  @Column(DataType.UUIDV4)
  pillarId?: string

  @ForeignKey(() => LensPillarChoice)
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
