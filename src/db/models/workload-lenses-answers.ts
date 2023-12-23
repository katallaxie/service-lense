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
  BelongsToMany,
  Unique,
  NotNull
} from 'sequelize-typescript'
import { Workload } from './workload'
import { LensPillarQuestion, LensPillarChoice, WorkloadLens } from '..'
import { WorkloadLensesAnswerChoice } from './workload-lenses-answers-choices'

export interface WorkloadLensesAnswerAttributes {
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

export type WorkloadLensesAnswerCreationAttributes = Omit<
  WorkloadLensesAnswerAttributes,
  'createdAt' | 'updatedAt' | 'deletedAt'
>

@Table({
  tableName: 'workloads-lenses-answers'
})
export class WorkloadLensesAnswer extends Model<
  WorkloadLensesAnswerAttributes,
  WorkloadLensesAnswerCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: bigint

  @ForeignKey(() => Workload)
  @Unique('workload-lens-pillar-question')
  @Column(DataType.UUID)
  workloadId?: string

  @ForeignKey(() => LensPillarQuestion)
  @Unique('workload-lens-pillar-question')
  @Column
  lensPillarQuestionId?: bigint

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

  @BelongsToMany(() => LensPillarChoice, () => WorkloadLensesAnswerChoice)
  lensChoices?: LensPillarChoice[]

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
