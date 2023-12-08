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
  Min,
  Max,
  NotEmpty
} from 'sequelize-typescript'

export interface LensPillarQuestionAttributes {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export type LensPillarQuestionCreationAttributes = Omit<
  LensPillarQuestionAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

// This table stores all of the possible answers to a question
@Table({
  tableName: 'lens-pillar-question'
})
export class LensPillarQuestion extends Model<
  LensPillarQuestionAttributes,
  LensPillarQuestionCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: string

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
