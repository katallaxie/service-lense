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
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { rhfActionSchema } from './new-form.schema'
import { rhfAction } from './new-form.action'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useAction } from '@/trpc/client'
import { useRouter } from 'next/navigation'
import { SolutionTemplate } from '@/db/models/solution-templates'

export type NewProfileFormProps = {
  className?: string
  template?: SolutionTemplate
}

export function NewProfileForm({ ...props }: NewProfileFormProps) {
  const form = useForm<z.infer<typeof rhfActionSchema>>({
    resolver: zodResolver(rhfActionSchema)
  })
  const router = useRouter()

  const mutation = useAction(rhfAction)
  async function onSubmit(data: z.infer<typeof rhfActionSchema>) {
    await mutation.mutateAsync({ ...data })
  }

  useEffect(() => {
    if (mutation.status === 'success') {
      router.push(`/dashboard/profiles/${mutation.data?.id}`)
    }
  })

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
            name="description"
            render={({ field }) => (
              <div className="grid w-full">
                <FormControl>
                  <Textarea
                    {...field}
                    className="w-full"
                    placeholder="Add a description ..."
                  />
                </FormControl>
                <FormDescription>
                  Provide a description for this profile.
                </FormDescription>
                <FormMessage />
              </div>
            )}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting || !form.formState.isValid}
          >
            Add Workload
          </Button>
        </form>
      </Form>
    </>
  )
}
