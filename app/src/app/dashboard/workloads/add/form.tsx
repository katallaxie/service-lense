'use client'

import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import * as z from 'zod'
import { OpenAPI, WorkloadsService } from '@/generated'

OpenAPI.BASE = 'http://localhost:8080'

const { addWorkload } = WorkloadsService

import { Button } from '@/components/ui/button'
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
import { Input } from '@/components/ui/input'

const FormSchema = z.object({
  name: z.string().min(3, {}),
  environment: z.string().min(3, {}),
  description: z
    .string()
    .min(10, {
      message: 'Description must be at least 30 characters.'
    })
    .max(2024, {
      message: 'Description must be less than 2024 characters.'
    }),
  tags: z.array(z.string())
})

export function AddWorkloadForm() {
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      description: '',
      environment: '',
      tags: []
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const { description, name, environment, tags } = data
      const res = await addWorkload({
        description,
        name,
        environment
      })

      router.push(`/workload/${res.id}`)
    } catch (error) {}
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
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
                  {...field}
                />
              </FormControl>
              <FormDescription>The name of workload to review.</FormDescription>
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
                  placeholder="Tell us a bit about the workload."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The specification to create a lense to review workloads.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="environment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Environment</FormLabel>
              <FormControl>
                <Input
                  disabled={form.formState.isSubmitting}
                  placeholder="production, staging, development"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The environment the workload is running in.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex">
          <Link href="/workloads" passHref>
            <Button variant="ghost">Cancel</Button>
          </Link>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  )
}
