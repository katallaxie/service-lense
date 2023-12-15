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
  AutoIncrement,
  Min,
  Max,
  Default,
  AllowNull,
  HasMany
} from 'sequelize-typescript'
import { Workload } from './workload'
import { LensPillarQuestion } from '..'
import { WorkloadLensPillarAnswerChoice } from './workload-lens-pillar-question-answer-choices'

export interface WorkloadLensPillarAnswerAttributes {
  id: string
  workloadId: string
  questionId: string
  notes?: string
  doesNotApply?: boolean
  doesNotApplyReason?: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export type WorkloadLensPillarAnswerCreationAttributes = Omit<
  WorkloadLensPillarAnswerAttributes,
  'createdAt' | 'updatedAt' | 'deletedAt'
>

@Table({
  tableName: 'workload-lens-pillars-answers'
})
export class WorkloadLensPillarAnswer extends Model<
  WorkloadLensPillarAnswerAttributes,
  WorkloadLensPillarAnswerCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id?: string

  @ForeignKey(() => LensPillarQuestion)
  @Column(DataType.BIGINT)
  questionId?: string

  @ForeignKey(() => Workload)
  @Column(DataType.UUIDV4)
  workloadId?: string

  @AllowNull
  @Min(12)
  @Max(2048)
  @Column
  notes?: string

  @Default(false)
  @Column
  doesNotApply?: boolean

  @Column
  doesNotApplyReason?: string

  @HasMany(() => WorkloadLensPillarAnswerChoice, 'answerId')
  choices?: WorkloadLensPillarAnswerChoice[]

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
