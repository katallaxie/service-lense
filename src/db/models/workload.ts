import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  BelongsToMany,
  Max,
  Min,
  Model,
  NotEmpty,
  PrimaryKey,
  Table,
  UpdatedAt
} from 'sequelize-typescript'
import { Profile } from './profile'
import { Lens } from './lens'
import { WorkloadLens } from './workload-lens'
import { LensPillarChoice } from './lens-pillar-choice'
import { WorkloadEnvironment } from './workload-environment'
import { Environment } from './environment'
import { WorkloadLensPillarAnswer } from './workload-lens-pillar-question-answer'
import { WorkloadLensPillarAnswers } from './workload-lens-pillar-question-answers'

export interface WorkloadAttributes {
  id: string
  name: string
  description: string
  environments: Environment[]
  profilesId: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export type WorkloadCreationAttributes = Omit<
  WorkloadAttributes,
  'createdAt' | 'updatedAt' | 'deletedAt'
>

@Table({
  tableName: 'workloads'
})
export class Workload extends Model<
  WorkloadAttributes,
  WorkloadCreationAttributes
> {
  @PrimaryKey
  @Column(DataType.UUIDV4)
  id!: string

  @NotEmpty
  @Min(3)
  @Max(256)
  @Column
  name!: string

  @NotEmpty
  @Min(12)
  @Max(2048)
  @Column
  description!: string

  @ForeignKey(() => Profile)
  @Column
  profilesId?: string

  @BelongsTo(() => Profile)
  profile?: Profile

  @BelongsToMany(() => Lens, () => WorkloadLens)
  lenses?: Lens[]

  @BelongsToMany(() => Environment, () => WorkloadEnvironment)
  environments?: Environment[]

  @BelongsToMany(
    () => WorkloadLensPillarAnswer,
    () => WorkloadLensPillarAnswers
  )
  answers?: WorkloadLensPillarAnswer[]

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
