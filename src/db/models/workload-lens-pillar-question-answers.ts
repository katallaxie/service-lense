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
import { Workload } from './workload'
import { WorkloadLensPillarAnswer } from './workload-lens-pillar-question-answer'

export interface WorkloadLensPillarAnswersAttributes {
  id: string
  workloadId: string
  questionId: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export type WorkloadLensPillarAnswersCreationAttributes = Omit<
  WorkloadLensPillarAnswersAttributes,
  'createdAt' | 'updatedAt' | 'deletedAt'
>

@Table({
  tableName: 'workload-lens-pillar-answers'
})
export class WorkloadLensPillarAnswers extends Model<
  WorkloadLensPillarAnswersAttributes,
  WorkloadLensPillarAnswersCreationAttributes
> {
  @PrimaryKey
  @Column(DataType.UUIDV4)
  id!: string

  @ForeignKey(() => WorkloadLensPillarAnswer)
  @Column(DataType.UUIDV4)
  answerId?: string

  @ForeignKey(() => Workload)
  @Column(DataType.UUIDV4)
  workloadId?: string

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
