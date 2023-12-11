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
import { LensPillarChoice } from './lens-pillar-choice'
import { Workload } from './workload'

export interface WorkloadQuestionChoicesAttributes {
  id: string
  workloadId: string
  questionId: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export type WorkloadQuestionChoicesCreationAttributes = Omit<
  WorkloadQuestionChoicesAttributes,
  'createdAt' | 'updatedAt' | 'deletedAt'
>

@Table({
  tableName: 'workload-question-choices'
})
export class WorkloadQuestionChoices extends Model<
  WorkloadQuestionChoicesAttributes,
  WorkloadQuestionChoicesCreationAttributes
> {
  @PrimaryKey
  @Column(DataType.UUIDV4)
  id!: string

  @ForeignKey(() => LensPillarChoice)
  @Column(DataType.UUIDV4)
  choiceId?: string

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
