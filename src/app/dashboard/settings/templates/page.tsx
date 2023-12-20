import { Separator } from '@/components/ui/separator'
import { DataTableProvider } from '@/components/data-table-context'

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Templates</h3>
        <p className="text-sm text-muted-foreground">
          Customize solution templates.
        </p>
      </div>
      <DataTableProvider>
        <Separator />
      </DataTableProvider>
    </div>
  )
}
