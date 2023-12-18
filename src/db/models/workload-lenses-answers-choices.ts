import {
  Table,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Column,
  PrimaryKey,
  ForeignKey,
  AutoIncrement
} from 'sequelize-typescript'
import { LensPillarChoice, WorkloadLensesAnswer } from '..'

export interface WorkloadLensesAnswerChoiceAttributes {
  id: bigint
  answerId: bigint
  choiceId: bigint
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export type WorkloadLensesAnswerChoiceCreationAttributes = Omit<
  WorkloadLensesAnswerChoiceAttributes,
  'createdAt' | 'updatedAt' | 'deletedAt'
>

@Table({
  tableName: 'workload-lenses-answers-choices'
})
export class WorkloadLensesAnswerChoice extends Model<
  WorkloadLensesAnswerChoiceAttributes,
  WorkloadLensesAnswerChoiceAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: bigint

  @ForeignKey(() => WorkloadLensesAnswer)
  @Column
  answerId?: bigint

  @ForeignKey(() => LensPillarChoice)
  @Column
  choiceId?: bigint

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
