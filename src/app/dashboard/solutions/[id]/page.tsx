import {
  SubNav,
  SubNavTitle,
  SubNavActions,
  SubNavSubtitle
} from '@/components/sub-nav'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Section } from '@/components/section'
import { api } from '@/trpc/server-http'

export type PageProps = {
  params: { id: string }
}

export default async function Page({ params }: PageProps) {
  const solution = await api.getSolution.query(params?.id)

  return (
    <>
      <SubNav>
        <SubNavTitle>
          {solution?.name}
          <SubNavSubtitle>Manage and review workflows</SubNavSubtitle>
        </SubNavTitle>
        <SubNavActions></SubNavActions>
      </SubNav>
      <Section>
        {solution?.comments?.map(comment => (
          <Card key={comment.id}>
            <CardHeader>
              <CardTitle>{`Commented on ${comment.createdAt}`}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{comment.body}</p>
            </CardContent>
          </Card>
        ))}
      </Section>
    </>
  )
}
