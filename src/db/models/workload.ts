import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  Max,
  Min,
  Model,
  NotEmpty,
  PrimaryKey,
  Table,
  UpdatedAt
} from 'sequelize-typescript'
import { Profile } from './profile'

export interface WorkloadAttributes {
  id: string
  name: string
  description: string
  environment: string
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

  @NotEmpty
  @Min(3)
  @Max(256)
  @Column
  environment!: string

  @ForeignKey(() => Profile)
  @Column
  profilesId?: string

  @BelongsTo(() => Profile)
  profile?: Profile

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
