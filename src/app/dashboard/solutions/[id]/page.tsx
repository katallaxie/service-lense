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
import { remark } from 'remark'
import html from 'remark-html'
import Markdown from 'react-markdown'

export type PageProps = {
  params: { id: string }
}

export default async function Page({ params }: PageProps) {
  const solution = await api.getSolution.query(params?.id)

  const processedContent = await remark()
    .use(html)
    .process(solution?.body ?? '')
  const contentHtml = processedContent.toString()

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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="w-9/12">{`Created at ${solution?.createdAt}`}</CardTitle>
          </CardHeader>
          <CardContent>
            <Markdown
              components={{
                h1(props) {
                  const { node, ...rest } = props
                  return (
                    <h1
                      className="scroll-m-20 text-4xl font-extrabold tracking-tight mt-6 lg:text-5x"
                      {...rest}
                    />
                  )
                },
                h2(props) {
                  const { node, ...rest } = props
                  return (
                    <h1
                      className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mt-6 first:mt-0"
                      {...rest}
                    />
                  )
                },
                p(props) {
                  const { node, ...rest } = props
                  return (
                    <p
                      className="leading-7 [&:not(:first-child)]:mt-6"
                      {...rest}
                    />
                  )
                }
              }}
            >
              {solution?.body}
            </Markdown>
          </CardContent>
        </Card>

        {solution?.comments?.map(comment => (
          <Card key={comment.id} className="my-6">
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
