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
  HasMany,
  BelongsToMany
} from 'sequelize-typescript'
import { Workload } from './workload'
import { LensPillarQuestion, LensPillarChoice, WorkloadLens } from '..'
import { WorkloadLensPillarAnswerChoice } from './workload-lens-pillar-question-answer-choices'

export interface WorkloadLensPillarAnswerAttributes {
  id: string
  work: string
  workloadLensId: string
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
  tableName: 'workloads-lenses-answers'
})
export class WorkloadLensPillarAnswer extends Model<
  WorkloadLensPillarAnswerAttributes,
  WorkloadLensPillarAnswerCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id?: string

  @ForeignKey(() => WorkloadLens)
  @Column(DataType.INTEGER)
  workloadLensId?: string

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

  // @BelongsToMany(
  //   () => LensPillarChoice,
  //   () => WorkloadLensPillarAnswerChoice,
  //   'choiceId'
  // )
  // choices?: LensPillarChoice[]

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
