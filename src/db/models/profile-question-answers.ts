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
  NotEmpty,
  ForeignKey,
  BelongsTo,
  Unique,
  BelongsToMany
} from 'sequelize-typescript'
import { Profile, ProfileQuestion } from '..'

export interface ProfileQuestionAnswerAttributes {
  id: number

  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export type ProfileQuestionAnswerCreationAttributes = Omit<
  ProfileQuestionAnswerAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

@Table({
  tableName: 'profiles-questions-answers'
})
export class ProfileQuestionAnswer extends Model<
  ProfileQuestionAnswerAttributes,
  ProfileQuestionAnswerCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: string

  @ForeignKey(() => Profile)
  @Unique('profiles-questions')
  @Column(DataType.UUID)
  profileId?: string

  @ForeignKey(() => ProfileQuestion)
  @Unique('profiles-questions-choices')
  @Column
  choiceId?: bigint

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
