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
  Max
} from 'sequelize-typescript'
import { LensPillarQuestion } from './lens-pillar-questions'

export interface LensPillarChoicesAttributes {
  id: string
  ref: string
  name: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export type LensPillarChoiceCreationAttributes = Omit<
  LensPillarChoicesAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

@Table({
  tableName: 'lenses-pillars-choices'
})
export class LensPillarChoice extends Model<
  LensPillarChoicesAttributes,
  LensPillarChoiceCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: string

  @ForeignKey(() => LensPillarQuestion)
  @Column
  questionId?: bigint

  @NotEmpty
  @Min(3)
  @Max(256)
  @Column
  ref!: string

  @NotEmpty
  @Min(3)
  @Max(256)
  @Column
  name?: string

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
