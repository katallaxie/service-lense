import {
  Table,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Column,
  PrimaryKey,
  DataType,
  NotEmpty,
  Min,
  Max,
  BelongsToMany
} from 'sequelize-typescript'
import { LensPillarQuestion } from './lens-pillar-question'
import { LensPillarQuestions } from './lens-pillar-questions'

export interface LensPillarAttributes {
  id: string
  ref: string
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export type LensPillarCreationAttributes = Omit<
  LensPillarAttributes,
  'createdAt' | 'updatedAt' | 'deletedAt'
>

@Table({
  tableName: 'lens-pillar'
})
export class LensPillar extends Model<
  LensPillarAttributes,
  LensPillarCreationAttributes
> {
  @PrimaryKey
  @Column(DataType.UUIDV4)
  id!: string

  @NotEmpty
  @Min(3)
  @Max(256)
  @Column
  ref!: string

  @NotEmpty
  @Min(12)
  @Max(2048)
  @Column
  description!: string

  @BelongsToMany(() => LensPillarQuestion, () => LensPillarQuestions)
  questions?: LensPillarQuestion[]

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
