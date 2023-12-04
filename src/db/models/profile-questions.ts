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
import { Profile } from './profile'
import { ProfileQuestion } from './profile-question'

export interface ProfileQuestionsAttributes {
  id: string
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export type ProfileQuestionsCreationAttributes = Omit<
  ProfileQuestionsAttributes,
  'createdAt' | 'updatedAt' | 'deletedAt'
>

@Table({
  tableName: 'profile-questions'
})
export class ProfileQuestions extends Model<
  ProfileQuestionsAttributes,
  ProfileQuestionsCreationAttributes
> {
  @PrimaryKey
  @Column(DataType.UUIDV4)
  id!: string

  @ForeignKey(() => ProfileQuestion)
  @Column(DataType.UUIDV4)
  questionId?: string

  @ForeignKey(() => Profile)
  @Column(DataType.UUIDV4)
  profileId?: string

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
