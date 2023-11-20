'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import useSWR from 'swr'

const FormSchema = z.object({
  tags: z.array(z.string())
})

const updateWorkloads = (url: string) =>
  fetch('/api/workloads').then(res => res.json())

export function AddLensDialog() {
  const { data, mutate, isLoading } = useSWR('/api/workloads', updateWorkloads)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tags: []
    }
  })

  async function onSubmit(form: z.infer<typeof FormSchema>) {
    try {
      await fetch('/api/workloads', {
        method: 'POST',
        body: JSON.stringify(form)
      })

      await mutate({ ...data, rows: [...data.rows, form] }, true)

      toast({
        title: 'Workload created'
      })
    } catch (e) {}
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Lens</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Lens</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4"></div>
            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddLensDialog
