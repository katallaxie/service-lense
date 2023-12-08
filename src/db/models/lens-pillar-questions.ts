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
import { LensPillar } from './lens-pillar'
import { LensPillarQuestion } from './lens-pillar-question'

export interface LensPillarQuestionsAttributes {
  id: string
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export type LensPillarQuestionsCreationAttributes = Omit<
  LensPillarQuestionsAttributes,
  'createdAt' | 'updatedAt' | 'deletedAt'
>

@Table({
  tableName: 'lens-pillar-questions'
})
export class LensPillarQuestions extends Model<
  LensPillarQuestionsAttributes,
  LensPillarQuestionsCreationAttributes
> {
  @PrimaryKey
  @Column(DataType.UUIDV4)
  id!: string

  @ForeignKey(() => LensPillar)
  @Column(DataType.UUIDV4)
  lensPillarId?: string

  @ForeignKey(() => LensPillarQuestion)
  @Column(DataType.UUIDV4)
  lensPillarChoice?: string

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
