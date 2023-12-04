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
  BelongsToMany
} from 'sequelize-typescript'
import { ProfileQuestionAnswer } from './profile-question-answer'
import { ProfileQuestionAnswers } from './profile-question-answers'

export interface ProfileQuestionAttributes {
  id: string
  name: string // is this really needed, have to double check this.
  description: string
  isMultiple: boolean
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export type ProfileQuestionCreationAttributes = Omit<
  ProfileQuestionAttributes,
  'createdAt' | 'updatedAt' | 'deletedAt'
>

@Table({
  tableName: 'profile-question'
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
  @Column
  isMultiple!: boolean

  @BelongsToMany(() => ProfileQuestionAnswer, () => ProfileQuestionAnswers)
  answers?: ProfileQuestionAnswer[]

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
