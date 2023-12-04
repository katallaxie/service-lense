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
  NotEmpty,
  Min,
  Max
} from 'sequelize-typescript'

export interface ProfileAnswerAttributes {
  id: number
  description: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export type ProfileAnswerCreationAttributes = Omit<
  ProfileAnswerAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

@Table({
  tableName: 'profile-answer'
})
export class ProfileAnswer extends Model<
  ProfileAnswerAttributes,
  ProfileAnswerCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: string

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
