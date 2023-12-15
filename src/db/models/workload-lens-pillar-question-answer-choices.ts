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
import { LensPillarChoice } from '..'

export interface WorkloadLensPillarAnswerChoiceAttributes {
  id: string
  answerId: string
  choiceId: string
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
  @Column(DataType.BIGINT)
  id?: string

  @ForeignKey(() => WorkloadLensPillarAnswerChoice)
  @Column(DataType.BIGINT)
  answerId?: string

  @ForeignKey(() => LensPillarChoice)
  @Column(DataType.BIGINT)
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
