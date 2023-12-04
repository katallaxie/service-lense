import {
  Table,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Column,
  PrimaryKey,
  DataType,
  ForeignKey
} from 'sequelize-typescript'
import { ProfileQuestion } from './profile-question'
import { ProfileQuestionAnswer } from './profile-question-answer'

export interface ProfileQuestionAnswersAttributes {
  id: string
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export type ProfileQuestionAnswersCreationAttributes = Omit<
  ProfileQuestionAnswersAttributes,
  'createdAt' | 'updatedAt' | 'deletedAt'
>

// This links together questions to answery
@Table({
  tableName: 'profile-question-answers'
})
export class ProfileQuestionAnswers extends Model<
  ProfileQuestionAnswersAttributes,
  ProfileQuestionAnswersCreationAttributes
> {
  @PrimaryKey
  @Column(DataType.UUIDV4)
  id!: string

  @ForeignKey(() => ProfileQuestion)
  @Column(DataType.UUIDV4)
  questionId?: string

  @ForeignKey(() => ProfileQuestionAnswer)
  @Column(DataType.UUIDV4)
  answerId?: string

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
