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
  AutoIncrement
} from 'sequelize-typescript'
import { LensPillarChoice, WorkloadLensPillarAnswer } from '..'

export interface WorkloadLensPillarAnswerChoiceAttributes {
  id: bigint
  answerId: bigint
  choiceId: bigint
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export type WorkloadLensPillarAnswerChoiceCreationAttributes = Omit<
  WorkloadLensPillarAnswerChoiceAttributes,
  'createdAt' | 'updatedAt' | 'deletedAt'
>

@Table({
  tableName: 'workload-lens-pillar-choices'
})
export class WorkloadLensPillarAnswerChoice extends Model<
  WorkloadLensPillarAnswerChoiceAttributes,
  WorkloadLensPillarAnswerChoiceAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: bigint

  @ForeignKey(() => WorkloadLensPillarAnswer)
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
