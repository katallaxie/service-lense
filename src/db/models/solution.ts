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
  HasMany
} from 'sequelize-typescript'
import { SolutionComment } from './solution-comments'

export interface SolutionAttributes {
  id: string
  title: string
  body: string
  description?: string
  comments?: SolutionComment[]
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export type SolutionCreationAttributes = Omit<
  SolutionAttributes,
  'createdAt' | 'updatedAt' | 'deletedAt'
>

@Table({
  tableName: 'solutions'
})
export class Solution extends Model<
  SolutionAttributes,
  SolutionCreationAttributes
> {
  @PrimaryKey
  @Column(DataType.UUIDV4)
  id?: string

  @NotEmpty
  @Min(3)
  @Max(256)
  @Column
  title?: string

  @NotEmpty
  @Column(DataType.TEXT)
  body?: string

  @HasMany(() => SolutionComment, 'solutionId')
  comments?: SolutionComment[]

  @NotEmpty
  @Min(12)
  @Max(2048)
  @Column
  description?: string

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
