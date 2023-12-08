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
  AllowNull,
  BelongsToMany
} from 'sequelize-typescript'
import { LensPillarQuestion } from './lens-pillar-question'
import { LensPillarQuestions } from './lens-pillar-questions'

export interface LensPillarAttributes {
  id: string
  name: string // is this really needed, have to double check this.
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
