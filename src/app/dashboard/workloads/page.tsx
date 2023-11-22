import { Table } from './components/table'
import { AddWorkloadDialog } from './components/add-dialog'
import {
  SubNav,
  SubNavTitle,
  SubNavActions,
  SubNavSubtitle
} from '@/components/sub-nav'

type RootProps = {
  children: React.ReactNode
}
import { DataTableProvider } from '@/components/data-table-context'

export default function Page({ children }: RootProps) {
  return (
    <>
      <SubNav>
        <SubNavTitle>
          Workloads
          <SubNavSubtitle>Manage and review workflows</SubNavSubtitle>
        </SubNavTitle>
        <SubNavActions>
          <AddWorkloadDialog />
        </SubNavActions>
      </SubNav>
      <section>
        <DataTableProvider>
          <Table />
        </DataTableProvider>
      </section>
    </>
  )
}

// 'use client'

// import React from 'react'
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   Pagination,
//   Spinner,
//   getKeyValue
// } from '@nextui-org/react'
// import useSWR from 'swr'
// import { useMemo } from 'react'

// const fetcher = (url: string) => fetch(url).then(res => res.json())

// export default function Page({ ...props }) {
//   const [page, setPage] = React.useState(1)

//   const { data, isLoading } = useSWR(
//     `/api/workloads?page=${page}&limit=1`,
//     fetcher,
//     {
//       keepPreviousData: true
//     }
//   )

//   const rowsPerPage = 10

//   const pages = useMemo(() => {
//     return data?.count ? Math.ceil(data.count / rowsPerPage) : 0
//   }, [data?.count, rowsPerPage])

//   const loadingState = isLoading || data?.count === 0 ? 'loading' : 'idle'

//   return (
//     <Table
//       aria-label="Example table with client async pagination"
//       bottomContent={
//         pages > 0 ? (
//           <div className="flex w-full justify-center">
//             <Pagination
//               isCompact
//               showControls
//               showShadow
//               color="primary"
//               page={page}
//               total={3}
//               onChange={page => setPage(page)}
//             />
//           </div>
//         ) : null
//       }
//       {...props}
//     >
//       <TableHeader>
//         <TableColumn key="id">ID</TableColumn>
//         <TableColumn key="name">Name</TableColumn>
//       </TableHeader>
//       <TableBody
//         items={data?.rows ?? []}
//         loadingContent={<Spinner />}
//         loadingState={loadingState}
//       >
//         {(item: { name?: string }) => (
//           <TableRow key={item?.name}>
//             {columnKey => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
//           </TableRow>
//         )}
//       </TableBody>
//     </Table>
//   )
// }

// import Table from './components/App'

// export default function Page() {
//   return <Table />
// }
