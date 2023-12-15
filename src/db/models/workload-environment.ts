import {
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  AutoIncrement,
  UpdatedAt
} from 'sequelize-typescript'
import { Workload } from './workload'
import { Environment } from '..'

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
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

@Table({
  tableName: 'workloads-environment'
})
export class WorkloadEnvironment extends Model<
  WorkloadEnvironmentAttributes,
  WorkloadEnvironmentCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: string

  @ForeignKey(() => Workload)
  @Column(DataType.UUIDV4)
  workloadId?: string

  @ForeignKey(() => Environment)
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
