'use client'

import {
  SubNav,
  SubNavTitle,
  SubNavActions,
  SubNavSubtitle
} from '@/components/sub-nav'
import { Suspense } from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm, UseFormProps } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createLensAction } from './create.action'
import { Button } from '@/components/ui/button'
import * as z from 'zod'
import { useAction } from '@/trpc/client'
import { CreateLensSchema } from './create.schema'

export interface PageProps {
  children?: React.ReactNode
}

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

export function CreateLensForm() {
  const mutation = useAction(createLensAction)
  const form = useZodForm({
    schema: CreateLensSchema
  })

  async function onSubmit(form: z.infer<typeof CreateLensSchema>) {
    await mutation.mutateAsync({ ...form })
  }

  return (
    <>
      <Form {...form}>
        <form action={createLensAction} onSubmit={form.handleSubmit(onSubmit)}>
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
                      {...field}
                      type="file"
                      disabled={form.formState.isSubmitting}
                      placeholder=""
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
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Create
          </Button>
        </form>
      </Form>
    </>
  )
}
