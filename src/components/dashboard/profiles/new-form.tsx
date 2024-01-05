'use client'

import { use } from 'react'
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { rhfActionSchema } from './new-form.schema'
import { rhfAction } from './new-form.action'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useAction } from '@/trpc/client'
import { useRouter } from 'next/navigation'
import { SolutionTemplate } from '@/db/models/solution-templates'
import { ProfileQuestion } from '@/db/models/profile-question'
import { Lead } from '@/components/lead'
import { Checkbox } from '@/components/ui/checkbox'

export type NewProfileFormProps = {
  className?: string
  template?: SolutionTemplate
  questions?: ProfileQuestion[]
  selectedChoices?: Record<string, string[]>
}

export function NewProfileForm({
  questions,
  selectedChoices,
  ...props
}: NewProfileFormProps) {
  const form = useForm<z.infer<typeof rhfActionSchema>>({
    resolver: zodResolver(rhfActionSchema),
    defaultValues: {
      name: '',
      description: '',
      selectedChoices
    }
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
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Profile Questions</CardTitle>
            </CardHeader>
            <CardContent>
              {questions?.map((question, idx) =>
                question.isMultiple ? (
                  <div key={idx}>
                    <Lead>{question.name}</Lead>
                    {question?.choices?.map(choice => (
                      <FormField
                        key={choice.id}
                        control={form.control}
                        name="selectedChoices"
                        render={({ field, ...rest }) => {
                          return (
                            <FormItem
                              key={choice.id}
                              className="flex flex-row items-start space-y-0 my-4"
                            >
                              <FormControl>
                                <Checkbox
                                  className="mr-2"
                                  checked={field.value[question.ref].includes(
                                    choice.id
                                  )}
                                  onCheckedChange={checked => {
                                    return checked
                                      ? field.onChange({
                                          ...field,
                                          [question.ref]: [
                                            ...field.value[question.ref],
                                            choice.id
                                          ]
                                        })
                                      : field.onChange({
                                          ...field,
                                          [question.ref]: field.value[
                                            question.ref
                                          ].filter(value => value !== choice.id)
                                        })
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {choice.name}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <FormField
                    key={idx}
                    control={form.control}
                    name="selectedChoices"
                    render={({ field }) => (
                      <div className="grid w-full">
                        <FormLabel>
                          <Lead>{question.name}</Lead>
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={value => {
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
                        <FormDescription>
                          {question.description}
                        </FormDescription>
                        <FormMessage />
                      </div>
                    )}
                  />
                )
              )}
            </CardContent>
          </Card>

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
