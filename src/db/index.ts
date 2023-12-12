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
import { WorkloadLensPillarAnswers } from './models/workload-lens-pillar-question-answers'
import { WorkloadLensPillarAnswerChoices } from './models/workload-lens-pillar-question-answer-choices'
import { WorkloadLensPillarAnswer } from './models/workload-lens-pillar-question-answer'
import { LensPillarRisk } from './models/lens-pillar-risk'
import { LensPillars } from './models/lens-pillars'
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
  LensPillars,
  Profile,
  ProfileQuestion,
  ProfileQuestionAnswer,
  ProfileQuestionAnswers,
  ProfileQuestions,
  Solution,
  Workload,
  WorkloadEnvironment,
  WorkloadLens,
  WorkloadLensPillarAnswers,
  WorkloadLensPillarAnswerChoices,
  WorkloadLensPillarAnswer
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
  WorkloadLens,
  WorkloadLensPillarAnswers,
  WorkloadLensPillarAnswerChoices,
  WorkloadLensPillarAnswer
}

export const initDB = async () => {
  await sequelize.authenticate()
  await sequelize.sync({ alter: true })
}
