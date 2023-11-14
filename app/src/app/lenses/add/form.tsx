'use client'

import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import * as z from 'zod'
import { OpenAPI, LensService, AddLensBody } from '@/generated'

OpenAPI.BASE = 'http://localhost:8080'

const { addLens } = LensService

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
import { toast } from '@/components/ui/use-toast'
import { use } from 'react'

const MAX_FILE_SIZE = 500000
const ACCEPTED_SPEC_TYPES = [
  'application/json',
  'application/x-yaml',
  'text/yaml'
]

const FormSchema = z.object({
  owner: z.string().min(3, {}),
  description: z
    .string()
    .min(10, {
      message: 'Description must be at least 30 characters.'
    })
    .max(2024, {
      message: 'Description must be less than 2024 characters.'
    }),
  lens: z
    .instanceof(File)
    .refine(file => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      file => ACCEPTED_SPEC_TYPES.includes(file?.type),
      '.json, .yaml files are accepted.'
    )
})

export function AddLensForm() {
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      owner: '',
      lens: new File([], '')
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const { lens, description, owner } = data
      const spec = await lens?.text()

      const res = await addLens({
        description,
        spec,
        owner,
        tags: ['test']
      })

      router.push(`/lens/${res.id}`)
    } catch (error) {}
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="lens"
          render={({ field }) => (
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <FormLabel>Lens file</FormLabel>
              <FormControl>
                <Input
                  accept=".yaml, .json"
                  type="file"
                  disabled={form.formState.isSubmitting}
                  onChange={e =>
                    field.onChange(e.target.files ? e.target.files[0] : null)
                  }
                />
              </FormControl>
              <FormDescription>
                The specification to create a lense to review workloads.
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
                  placeholder="Tell us a bit about the lens."
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
          name="owner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Owner</FormLabel>
              <FormControl>
                <Input
                  disabled={form.formState.isSubmitting}
                  placeholder='e.g. "Team X"'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The owner of the lense. This can be a team or an individual.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex">
          <Link href="/lenses" passHref>
            <Button variant="ghost">Cancel</Button>
          </Link>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}
