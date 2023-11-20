import {
  Table,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Column,
  PrimaryKey,
  DataType,
  AllowNull,
  NotEmpty,
  Min,
  Max
} from 'sequelize-typescript'

export interface LensAttributes {
  id: string
  spec: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export type LensCreationAttributes = Omit<
  LensAttributes,
  'createdAt' | 'updatedAt' | 'deletedAt'
>

@Table({
  tableName: 'lenses'
})
export class Workload extends Model<LensAttributes, LensCreationAttributes> {
  @PrimaryKey
  @Column(DataType.UUIDV4)
  id!: string

  @NotEmpty
  @Min(3)
  @Max(256)
  @Column
  spec!: string

  @NotEmpty
  @Min(12)
  @Max(2048)
  @Column
  description!: string

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
