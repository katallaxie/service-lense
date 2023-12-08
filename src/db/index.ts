import { Environment } from './models/environment'
import { Lens } from './models/lens'
import { Profile } from './models/profile'
import { Sequelize } from 'sequelize-typescript'
import { Solution } from './models/solution'
import { Workload } from './models/workload'
import { WorkloadLens } from './models/workload-lens'
import { ProfileQuestion } from './models/profile-question'
import { ProfileQuestionAnswer } from './models/profile-question-answer'
import { ProfileQuestionAnswers } from './models/profile-question-answers'
import { ProfileQuestions } from './models/profile-questions'
import { WorkloadEnvironment } from './models/workload-environment'
import { LensPillar } from './models/lens-pillar'
import { LensPillarChoices } from './models/lens-pillar-choices'
import { LensPillarChoice } from './models/lens-pillar-choice'
import { LensPillarQuestion } from './models/lens-pillar-question'
import { LensPillarQuestions } from './models/lens-pillar-questions'
import { LensPillarRisk } from './models/lens-pillar-risk'
import { LensPillarRisks } from './models/lens-pillar-risks'
import config from './config/config'

const env = process.env.NODE_ENV || 'development'

export const sequelize = new Sequelize({
  ...config[env]
})

sequelize.addModels([
  Environment,
  Lens,
  LensPillar,
  LensPillarChoice,
  LensPillarChoices,
  LensPillarQuestion,
  LensPillarQuestions,
  LensPillarRisk,
  LensPillarRisks,
  Profile,
  ProfileQuestion,
  ProfileQuestionAnswer,
  ProfileQuestionAnswers,
  ProfileQuestions,
  Solution,
  Workload,
  WorkloadEnvironment,
  WorkloadLens
])

export {
  Environment,
  Lens,
  LensPillar,
  LensPillarChoice,
  LensPillarChoices,
  LensPillarQuestion,
  LensPillarQuestions,
  LensPillarRisk,
  LensPillarRisks,
  Profile,
  ProfileQuestion,
  ProfileQuestionAnswer,
  ProfileQuestionAnswers,
  ProfileQuestions,
  Solution,
  Workload,
  WorkloadEnvironment,
  WorkloadLens
}

export const initDB = async () => {
  await sequelize.authenticate()
  await sequelize.sync({ alter: true })
}
