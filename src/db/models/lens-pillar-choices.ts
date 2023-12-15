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
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export type LensPillarChoiceCreationAttributes = Omit<
  LensPillarChoicesAttributes,
  'createdAt' | 'updatedAt' | 'deletedAt'
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
  @Column(DataType.UUIDV4)
  questionId?: string

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

  @NotEmpty
  @Min(12)
  @Max(2048)
  @Column
  description!: string

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
