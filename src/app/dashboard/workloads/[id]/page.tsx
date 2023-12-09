import {
  SubNav,
  SubNavTitle,
  SubNavActions,
  SubNavSubtitle
} from '@/components/sub-nav'
import { OverviewCard } from './components/overview-card'
import { ProfileCard } from './components/profile-card'
import { Section } from '@/components/section'
import { api } from '@/trpc/server-http'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { PropertiesCard } from './components/properties-card'
import { LensCard } from './components/lens-card'
import { Separator } from '@/components/ui/separator'

export type PageProps = {
  params: { id: string }
}

export default async function Page({ params }: PageProps) {
  const workload = await api.getWorkload.query(params?.id)

  return (
    <>
      <SubNav>
        <SubNavTitle>
          {workload?.name}
          <SubNavSubtitle>Manage and review workflows</SubNavSubtitle>
        </SubNavTitle>
        <SubNavActions></SubNavActions>
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
            <div className="ml-auto mr-4">
              <Button>
                <PlusCircledIcon className="mr-2 h-4 w-4" />
                Add Lens
              </Button>
            </div>
          </div>
          <TabsContent
            value="overview"
            className="border-none p-0 outline-none"
          >
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              {workload && (
                <OverviewCard workload={workload} className="col-span-4" />
              )}
              {workload?.profile && (
                <ProfileCard
                  profile={workload.profile}
                  className="col-span-3"
                />
              )}
              {workload?.lenses &&
                workload?.lenses.length > 0 &&
                workload?.lenses?.map(lens => (
                  <LensCard key={lens.id} lens={lens} className="col-span-2" />
                ))}
            </div>
          </TabsContent>
          <TabsContent
            value="properties"
            className="h-full flex-col border-none p-0 data-[state=active]:flex"
          >
            {workload && <PropertiesCard workload={workload} />}
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
