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
  NotEmpty,
  BelongsToMany
} from 'sequelize-typescript'
import {
  LensPillarChoices,
  LensPillarChoice,
  LensPillarRisks,
  LensPillarRisk
} from '..'

export interface LensPillarQuestionAttributes {
  id: number
  ref: string
  name: string
  description: string
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

  @BelongsToMany(() => LensPillarChoice, () => LensPillarChoices)
  choices?: LensPillarChoice[]

  @BelongsToMany(() => LensPillarRisk, () => LensPillarRisks)
  risks?: LensPillarRisk[]

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
