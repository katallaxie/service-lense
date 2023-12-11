import {
  SubNav,
  SubNavTitle,
  SubNavActions,
  SubNavSubtitle
} from '@/components/sub-nav'
import { Section } from '@/components/section'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { api } from '@/trpc/server-http'
import { map } from '@trpc/server/observable'

export type PageProps = {
  params: { questionId: string; lensId: string; id: string }
}

export default async function Page({ params }: PageProps) {
  const question = await api.getLensQuestion.query(params?.questionId)

  return (
    <>
      <h1>{question?.name}</h1>
      <p>{question?.description}</p>
      {/* {question?.choices?.map(question => <h1>{question.name}</h1>)} */}
    </>
  )
}
