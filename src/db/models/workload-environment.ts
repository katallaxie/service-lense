import {
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt
} from 'sequelize-typescript'
import { Workload } from './workload'
import { Lens } from './lens'

export interface WorkloadEnvironmentAttributes {
  id: number
  environmentId: string
  workloadId: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export type WorkloadEnvironmentCreationAttributes = Omit<
  WorkloadEnvironmentAttributes,
  'createdAt' | 'updatedAt' | 'deletedAt'
>

@Table({
  tableName: 'workload-environment'
})
export class WorkloadEnvironment extends Model<
  WorkloadEnvironmentAttributes,
  WorkloadEnvironmentCreationAttributes
> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: string

  @ForeignKey(() => Workload)
  @Column(DataType.UUIDV4)
  workloadId?: string

  @ForeignKey(() => Lens)
  @Column(DataType.UUIDV4)
  environmentId?: string

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
