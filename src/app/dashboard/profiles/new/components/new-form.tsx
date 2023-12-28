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
import { z } from 'zod'
import { H4 } from '@/components/h4'
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
      selectedChoices: questions?.reduce(
        (prev, curr) => ({ ...prev, [curr.ref]: [] }),
        {}
      )
    }
  })
  const router = useRouter()
  const q = useMemo(() => questions, [questions])

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
                  <H4>Name</H4>
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
                      <H4>{question.name}</H4>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={value => {
                          console.log(value, field.value)
                          field.onChange({
                            ...field.value,
                            [question.ref]: [value]
                          })
                        }}
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
