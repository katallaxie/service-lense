import {
  SubNav,
  SubNavTitle,
  SubNavActions,
  SubNavSubtitle
} from '@/components/sub-nav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Section } from '@/components/section'
import { api } from '@/trpc/server-http'
import { CommentForm } from './components/comment-form'
import { CommentActions } from './components/comment-actions'

export type PageProps = {
  params: { id: string }
}

export default async function Page({ params }: PageProps) {
  const solution = await api.getSolution.query(params?.id)

  return (
    <>
      <SubNav>
        <SubNavTitle>
          {solution?.title}
          <SubNavSubtitle>Manage and review workflows</SubNavSubtitle>
        </SubNavTitle>
        <SubNavActions></SubNavActions>
      </SubNav>
      <Section>
        {solution?.comments?.map(comment => (
          <Card key={comment.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="w-9/12">{`Commented on ${comment.createdAt}`}</CardTitle>
              <CommentActions comment={comment} />
            </CardHeader>
            <CardContent>
              <p>{comment.body}</p>
            </CardContent>
          </Card>
        ))}
        <CommentForm solutionId={params.id} />
      </Section>
    </>
  )
}
