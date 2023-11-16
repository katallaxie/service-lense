import {
  Table,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Column,
  PrimaryKey,
  DataType,
  Default,
  NotEmpty,
  Min,
  Max
} from 'sequelize-typescript'

type Environment = 'production' | 'development' | 'staging'

export interface WorkloadAttributes {
  id: string
  name: string
  description: string
  environment: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export type WorkloadCreationAttributes = Omit<
  WorkloadAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

@Table
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
