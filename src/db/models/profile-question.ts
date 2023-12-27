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
  AllowNull,
  BelongsToMany,
  HasMany,
  Default
} from 'sequelize-typescript'
import { ProfileQuestionChoice } from '..'

export interface ProfileQuestionAttributes {
  id: string
  name: string // is this really needed, have to double check this.
  description: string
  isMultiple: boolean
  choices: ProfileQuestion[]
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export type ProfileQuestionCreationAttributes = Omit<
  ProfileQuestionAttributes,
  'createdAt' | 'updatedAt' | 'deletedAt'
>

@Table({
  tableName: 'profiles-questions'
})
export class ProfileQuestion extends Model<
  ProfileQuestionAttributes,
  ProfileQuestionCreationAttributes
> {
  @PrimaryKey
  @Column(DataType.UUIDV4)
  id!: string

  @NotEmpty
  @Min(12)
  @Max(2048)
  @Column
  description!: string

  @AllowNull
  @Default(false)
  @Column
  isMultiple!: boolean

  @HasMany(() => ProfileQuestionChoice, 'questionId')
  choices?: ProfileQuestion[]

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
