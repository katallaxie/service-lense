import { api } from '@/trpc/server-http'
import { QuestionFormFactory } from './components/question-form'

export type PageProps = {
  params: { questionId: string; lensId: string; id: string }
}

export default async function Page({ params }: PageProps) {
  const question = await api.getLensQuestion.query(params?.questionId)
  const workload = await api.getWorkload.query(params?.id)
  console.log(workload!.answers![0])

  return (
    <>
      <h1>{question?.name}</h1>
      <p>{question?.description}</p>
      {question && <QuestionFormFactory question={question} choices={[]} />}
    </>
  )
}
