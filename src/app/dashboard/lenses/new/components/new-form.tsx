'use client'

import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  FormField
} from '@/components/ui/form'
import { useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { rhfActionSchema } from './new-form.schema'
import { rhfAction } from './new-form.action'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useAction } from '@/trpc/client'
import { useRouter } from 'next/navigation'

export type NewSolutionFormProps = {
  className?: string
}

export function NewSolutionForm({ ...props }: NewSolutionFormProps) {
  const form = useForm<z.infer<typeof rhfActionSchema>>({
    resolver: zodResolver(rhfActionSchema),
    defaultValues: {
      name: '',
      description: ''
    },
    mode: 'onChange'
  })
  const router = useRouter()

  const mutation = useAction(rhfAction)
  async function onSubmit(data: z.infer<typeof rhfActionSchema>) {
    await mutation.mutateAsync({ ...data })
  }

  useEffect(() => {
    if (mutation.status === 'success') {
      router.push(`/dashboard/lenses/${mutation.data?.}`)
    }
  })

  const fileRef = form.register('spec', { required: true })

  return (
    <>
      <Form {...form}>
        <form
          action={rhfAction}
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <h1>Name</h1>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Give it a great name.</FormDescription>
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
                    placeholder=""
                    {...fileRef}
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
                <FormLabel>
                  <h1>Description</h1>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Give it a good description.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={form.formState.isSubmitting || !form.formState.isValid}
          >
            New Solution
          </Button>
        </form>
      </Form>
    </>
  )
}
