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
  BelongsToMany
} from 'sequelize-typescript'
import { LensPillarChoice } from './lens-pillar-choice'
import { Workload } from './workload'
import { WorkloadLensPillarAnswers } from './workload-lens-pillar-question-answers'
import { LensPillarQuestion } from '..'
import { WorkloadLensPillarAnswerChoices } from './workload-lens-pillar-question-answer-choices'

export interface WorkloadLensPillarAnswerAttributes {
  id: string
  questionId: string
  choices: LensPillarChoice[]
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export type WorkloadLensPillarAnswerCreationAttributes = Omit<
  WorkloadLensPillarAnswerAttributes,
  'createdAt' | 'updatedAt' | 'deletedAt'
>

@Table({
  tableName: 'workload-lens-pillar-answer'
})
export class WorkloadLensPillarAnswer extends Model<
  WorkloadLensPillarAnswerAttributes,
  WorkloadLensPillarAnswerCreationAttributes
> {
  @PrimaryKey
  @Column(DataType.UUIDV4)
  id!: string

  @ForeignKey(() => LensPillarQuestion)
  @Column(DataType.UUIDV4)
  questionId?: string

  @BelongsToMany(() => LensPillarChoice, () => WorkloadLensPillarAnswerChoices)
  answers?: LensPillarChoice[]

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
