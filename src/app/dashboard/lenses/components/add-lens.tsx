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
import { Label } from '@/components/ui/label'
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
  name: z.string().min(3, {}),
  spec: z.string(),
  description: z
    .string()
    .min(10, {
      message: 'Description must be at least 30 characters.'
    })
    .max(2024, {
      message: 'Description must be less than 2024 characters.'
    })
})

const update = () => fetch('/api/profiles').then(res => res.json())

const createLens = (form: z.infer<typeof FormSchema>) =>
  fetch('/api/lenses', {
    method: 'POST',
    body: JSON.stringify(form)
  }).then(res => res.json())

export function AddLensDialog() {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {}
  })

  async function onSubmit(form: z.infer<typeof FormSchema>) {
    try {
      console.log(form)
      // const profile = await createLens(form)

      // await fetch('/api/workloads', {
      //   method: 'POST',
      //   body: JSON.stringify(form)
      // })

      // await mutate({ ...data, rows: [...data.rows, form] }, true)

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
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        disabled={form.formState.isSubmitting}
                        placeholder="Give it a descriptive name."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The business context for a workload.
                    </FormDescription>
                    <FormMessage />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={form.formState.isSubmitting}
                        placeholder="Tell us a bit about the profile."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A detailed description of the business context.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="spec"
                render={({ field }) => (
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <FormLabel>Specification</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        disabled={form.formState.isSubmitting}
                        placeholder="Give it a descriptive name."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The business context for a workload.
                    </FormDescription>
                    <FormMessage />
                  </div>
                )}
              />
            </div>
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
