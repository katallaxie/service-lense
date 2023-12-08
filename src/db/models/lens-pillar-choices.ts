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
import { LensPillar } from './lens-pillar'
import { LensPillarChoice } from './lens-pillar-choice'

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

  @ForeignKey(() => LensPillar)
  @Column(DataType.UUIDV4)
  lensPillarId?: string

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
