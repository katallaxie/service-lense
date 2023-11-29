'use client'

import { useRef } from 'react'
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

import { useAction } from '@/trpc/client'
import { addLensAction } from './add-lens.action'
import { AddLensActionSchema } from './add-lens.schema'

import { zodResolver } from '@hookform/resolvers/zod'
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
import { FormProvider, useForm, UseFormProps } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'

function useZodForm<TSchema extends z.ZodType>(
  props: Omit<UseFormProps<TSchema['_input']>, 'resolver'> & {
    schema: TSchema
  }
) {
  const form = useForm<TSchema['_input']>({
    ...props,
    resolver: zodResolver(props.schema, undefined)
  })

  return form
}

export function AddLensDialog() {
  const { toast } = useToast()
  const mutation = useAction(addLensAction, {
    onSuccess() {
      toast({ title: 'Workload created' })
    },
    onError() {
      toast({ title: 'Something went wrong' })
    }
  })
  const form = useZodForm({
    schema: AddLensActionSchema
  })
  const formRef = useRef<HTMLFormElement>(null)

  const readJSONFile = async (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = event => resolve(event.target?.result as string)
      reader.onerror = error => reject(error)
      reader.readAsText(file)
    })

  async function onSubmit(form: z.infer<typeof AddLensActionSchema>) {
    await mutation.mutateAsync({ description: '', name: 'demo 6', spec: {} })
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
          <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)}>
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
                render={({ field: { onChange }, ...field }) => (
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <FormLabel>Specification</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        disabled={form.formState.isSubmitting}
                        placeholder=""
                        {...field}
                        onChange={event => {
                          const dataTransfer = new DataTransfer()

                          Array.from(event.target.files!).forEach(spec =>
                            dataTransfer.items.add(spec)
                          )

                          const newFiles = dataTransfer.files
                          onChange(newFiles)
                        }}
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
