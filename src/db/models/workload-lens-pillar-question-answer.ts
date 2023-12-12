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
  BelongsToMany,
  BelongsTo,
  Default
} from 'sequelize-typescript'
import { LensPillarChoice } from './lens-pillar-choice'
import { LensPillarQuestion } from './lens-pillar-question'
import { WorkloadLensPillarAnswerChoices } from './workload-lens-pillar-question-answer-choices'

export interface WorkloadLensPillarAnswerAttributes {
  id: string
  questionId: string
  choices: LensPillarChoice[]
  doesNotApply: boolean
  notes: string
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

  @BelongsTo(() => LensPillarQuestion, 'questionId')
  question?: LensPillarQuestion

  @BelongsToMany(() => LensPillarChoice, () => WorkloadLensPillarAnswerChoices)
  choices?: LensPillarChoice[]

  @Column
  notes?: string

  @Default(false)
  @Column
  doesNotApply?: boolean

  @Column
  doesNotApplyReason?: string

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
