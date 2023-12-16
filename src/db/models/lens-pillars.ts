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
  NotEmpty,
  Min,
  Max,
  HasMany
} from 'sequelize-typescript'
import { Lens } from './lens'
import { LensPillarQuestion } from './lens-pillar-questions'

export interface LensPillarAttributes {
  id: string
  name: string
  ref: string
  description: string
  questions: LensPillarQuestion[]
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export type LensPillarCreationAttributes = Omit<
  LensPillarAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

@Table({
  tableName: 'lenses-pillars'
})
export class LensPillar extends Model<
  LensPillarAttributes,
  LensPillarCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id?: string

  @ForeignKey(() => Lens)
  @Column(DataType.UUIDV4)
  lensId?: string

  @NotEmpty
  @Min(3)
  @Max(256)
  @Column
  ref!: string

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

  @HasMany(() => LensPillarQuestion, 'pillarId')
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
