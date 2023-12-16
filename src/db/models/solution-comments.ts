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
  ForeignKey,
  AutoIncrement
} from 'sequelize-typescript'
import { Solution } from '..'

export interface SolutionCommentAttributes {
  id: number
  body: string
  solutionId: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export type SolutionCommentCreationAttributes = Omit<
  SolutionCommentAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

@Table({
  tableName: 'solutions-comments'
})
export class SolutionComment extends Model<
  SolutionCommentAttributes,
  SolutionCommentCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: bigint

  @NotEmpty
  @Column
  body?: string

  @ForeignKey(() => Solution)
  @Column(DataType.UUIDV4)
  solutionId?: string

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
