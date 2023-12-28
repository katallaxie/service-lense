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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useEffect, useMemo } from 'react'
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
import { ProfileQuestion } from '@/db'
import { Separator } from '@/components/ui/separator'

export type NewProfileFormProps = {
  className?: string
  template?: SolutionTemplate
  questions?: ProfileQuestion[]
}

export function NewProfileForm({ questions, ...props }: NewProfileFormProps) {
  const form = useForm<z.infer<typeof rhfActionSchema>>({
    resolver: zodResolver(rhfActionSchema),
    defaultValues: {
      name: '',
      description: '',
      selectedChoices: []
    }
  })
  const router = useRouter()
  const q = useMemo(() => questions, [questions])

  const mutation = useAction(rhfAction)
  async function onSubmit(data: z.infer<typeof rhfActionSchema>) {
    console.log(data)
    // await mutation.mutateAsync({ ...data })
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

          <Separator />

          {q?.map((question, idx) =>
            question.isMultiple ? (
              <div key={idx}></div>
            ) : (
              <FormField
                key={idx}
                control={form.control}
                name="selectedChoices"
                render={({ field }) => (
                  <div className="grid w-full">
                    <FormLabel>
                      <h1>{question.name}</h1>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={value => {
                          field.onChange([
                            ...(field.value?.filter(
                              value =>
                                !question.choices
                                  ?.map(c => c.id)
                                  .includes(value)
                            ) ?? []),
                            value
                          ])
                        }}
                        defaultValue={
                          question?.choices?.find(
                            c => field.value?.includes(c.id)
                          )?.id
                        }
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Not selected" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {question.choices?.map((choice, c) => (
                            <SelectItem key={c} value={choice.id}>
                              {choice.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>{question.description}</FormDescription>
                    <FormMessage />
                  </div>
                )}
              />
            )
          )}

          <Button
            type="submit"
            disabled={form.formState.isSubmitting || !form.formState.isValid}
          >
            Add Profile
          </Button>
        </form>
      </Form>
    </>
  )
}
