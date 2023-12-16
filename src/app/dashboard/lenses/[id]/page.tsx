import {
  SubNav,
  SubNavTitle,
  SubNavSubtitle,
  SubNavActions
} from '@/components/sub-nav'
import { Section } from '@/components/section'
import { api } from '@/trpc/server-http'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import DateFormat from '@/components/date-format'
import { ActionsDropdown } from './components/actions-dropdown'

export type PageProps = {
  params: { id: string }
}

export default async function Page({ params }: PageProps) {
  const lens = await api.getLens.query(params?.id)

  return (
    <>
      <SubNav>
        <SubNavTitle>
          {lens?.name}
          <SubNavSubtitle>{lens?.description}</SubNavSubtitle>
        </SubNavTitle>
        <SubNavActions>
          <ActionsDropdown lens={lens} />
        </SubNavActions>
      </SubNav>
      <Section>
        <Tabs defaultValue="overview" className="h-full space-y-6">
          <div className="space-between flex items-center">
            <TabsList>
              <TabsTrigger value="overview" className="relative">
                Overview
              </TabsTrigger>
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="permissions" disabled>
                Permissions
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent
            value="overview"
            className="border-none p-0 outline-none"
          >
            <div className="grid gap-4">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl">Overview</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-l font-semibold tracking-tight text-muted-foreground">
                        Last updated
                      </h2>
                      <p>
                        <DateFormat date={lens?.dataValues?.updatedAt} />
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <p>{lens?.description || 'No description provided.'}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent
            value="properties"
            className="h-full flex-col border-none p-0 data-[state=active]:flex"
          >
            Nothing yet.
          </TabsContent>
          <TabsContent
            value="permissions"
            className="h-full flex-col border-none p-0 data-[state=active]:flex"
          >
            Permissions
          </TabsContent>
        </Tabs>
      </Section>
    </>
  )
}
