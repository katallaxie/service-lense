import {
  Table,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Column,
  PrimaryKey
} from 'sequelize-typescript'

type Environment = 'production' | 'development' | 'staging'

@Table
export class Workload extends Model<Workload> {
  @PrimaryKey
  @Column
  id!: string

  @Column
  name!: string

  @Column
  description?: string

  @Column
  environment?: string

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date

  @DeletedAt
  @Column
  deletedAt?: Date
}
