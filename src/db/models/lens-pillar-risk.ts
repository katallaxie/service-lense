import {
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
  AutoIncrement,
  UpdatedAt,
  Min,
  Max,
  NotEmpty
} from 'sequelize-typescript'

export interface LensPillarRiskAttributes {
  id: number
  risk: string
  condition: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export type LensPillarRiskCreationAttributes = Omit<
  LensPillarRiskAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

// This table stores all of the possible answers to a question
@Table({
  tableName: 'lens-pillar-risk'
})
export class LensPillarRisk extends Model<
  LensPillarRiskAttributes,
  LensPillarRiskCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: string

  @NotEmpty
  @Min(3)
  @Max(256)
  @Column
  risk?: string

  @NotEmpty
  @Min(3)
  @Max(256)
  @Column
  condition?: string

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
