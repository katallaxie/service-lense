import {
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
  AutoIncrement,
  UpdatedAt,
  BelongsToMany,
  Min,
  Max,
  NotEmpty
} from 'sequelize-typescript'
import { LensPillarQuestion, LensPillarQuestions } from '..'

export interface LensPillarChoiceAttributes {
  id: number
  ref: string
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export type LensPillarChoiceCreationAttributes = Omit<
  LensPillarChoiceAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

// This table stores all of the possible answers to a question
@Table({
  tableName: 'lens-pillar-choice'
})
export class LensPillarChoice extends Model<
  LensPillarChoiceAttributes,
  LensPillarChoiceCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: string

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
