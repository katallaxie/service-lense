import { api } from '@/trpc/server-http'
import { QuestionFormFactory } from './components/question-form'

export type PageProps = {
  params: { questionId: string; lensId: string; id: string }
}

export default async function Page({ params }: PageProps) {
  const workloadLens = await api.findWorkloadLensQuestion.query({
    lensId: params.lensId,
    workloadId: params.id,
    questionId: params.questionId
  })

  // const workload = await api.getWorkloadAnswer.query({
  //   workloadId: params.id,
  //   questionId: params.questionId
  // })

  // const answer = workload?.answers?.shift()

  return <>{JSON.stringify(workloadLens)}</>

  // return <>{answer && <QuestionFormFactory answer={answer} />}</>
}
