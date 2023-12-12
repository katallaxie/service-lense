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
import { WorkloadLensPillarAnswer } from './workload-lens-pillar-question-answer'
import { LensPillarChoice } from '..'

export interface WorkloadLensPillarAnswerChoicesAttributes {
  id: string
  answerId: string
  choiceId: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export type WorkloadLensPillarAnswerChoicesCreationAttributes = Omit<
  WorkloadLensPillarAnswerChoicesAttributes,
  'createdAt' | 'updatedAt' | 'deletedAt'
>

@Table({
  tableName: 'workload-lens-pillar-answer-choices'
})
export class WorkloadLensPillarAnswerChoices extends Model<
  WorkloadLensPillarAnswerChoicesAttributes,
  WorkloadLensPillarAnswerChoicesAttributes
> {
  @PrimaryKey
  @Column(DataType.UUIDV4)
  id!: string

  @ForeignKey(() => WorkloadLensPillarAnswer)
  @Column(DataType.UUIDV4)
  answerId?: string

  @ForeignKey(() => LensPillarChoice)
  @Column(DataType.UUIDV4)
  choiceId?: string

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
