import { Environment } from './models/environment'
import { Lens } from './models/lens'
import { Profile } from './models/profile'
import { Sequelize } from 'sequelize-typescript'
import { Solution } from './models/solution'
import { SolutionComment } from './models/solution-comments'
import { Workload } from './models/workload'
import { WorkloadLens } from './models/workload-lens'
import { ProfileQuestionChoice } from './models/profile-question-choice'
import { ProfileQuestion } from './models/profile-question'
import { WorkloadEnvironment } from './models/workload-environment'
import { SolutionTemplate } from './models/solution-templates'
import { WorkloadLensesAnswer } from './models/workload-lenses-answers'
import { WorkloadLensesAnswerChoice } from './models/workload-lenses-answers-choices'
import { LensPillar } from './models/lens-pillars'
import { LensPillarChoice } from './models/lens-pillar-choices'
import { LensPillarQuestion } from './models/lens-pillar-questions'
import { LensPillarQuestionRisk } from './models/lens-pillar-risks'
import { User } from './models/users'
import { LensPillarChoiceResource } from './models/lens-pillar-choices-resources'
import { LensPillarResource } from './models/lens-pillar-resources'
import { LensPillarQuestionResource } from './models/lens-pillar-questions-resources'
import { ProfileQuestionAnswer } from './models/profile-question-answers'
import config from './config/config'

const env = process.env.NODE_ENV || 'development'
const isProduction = env === 'production'

export const sequelize = new Sequelize({
  ...config[env]
})

export { Sequelize }

sequelize.addModels([
  Environment,
  Lens,
  LensPillar,
  LensPillarChoice,
  LensPillarQuestion,
  LensPillarQuestionRisk,
  Profile,
  ProfileQuestion,
  ProfileQuestionChoice,
  Solution,
  Workload,
  WorkloadEnvironment,
  WorkloadLens,
  WorkloadLensesAnswer,
  WorkloadLensesAnswerChoice,
  SolutionComment,
  SolutionTemplate,
  LensPillarResource,
  LensPillarChoiceResource,
  LensPillarQuestionResource,
  ProfileQuestionAnswer,
  User
])

export {
  Environment,
  Lens,
  LensPillar,
  LensPillarChoice,
  LensPillarQuestionRisk,
  LensPillarQuestion,
  Profile,
  ProfileQuestion,
  ProfileQuestionChoice,
  Solution,
  Workload,
  WorkloadEnvironment,
  WorkloadLens,
  WorkloadLensesAnswer,
  WorkloadLensesAnswerChoice,
  SolutionComment,
  SolutionTemplate,
  LensPillarResource,
  LensPillarChoiceResource,
  LensPillarQuestionResource,
  ProfileQuestionAnswer,
  User
}

export const initDB = async () => {
  await sequelize.authenticate()
  !isProduction && (await sequelize.sync({ alter: true }))
}
