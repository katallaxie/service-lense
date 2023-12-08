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

export interface LensPillarChoiceAttributes {
  id: number
  name: string
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
  tableName: 'profile-question-answer'
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
