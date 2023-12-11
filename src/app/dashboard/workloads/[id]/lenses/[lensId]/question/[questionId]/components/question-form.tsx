'use client'

import { useEffect, useRef } from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { zodResolver } from '@hookform/resolvers/zod'
import { rhfActionSchema } from './question-form.schema'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useAction } from '@/trpc/client'
import { rhfAction } from './question-form.action'
import { LensPillarQuestion } from '@/db/models/lens-pillar-question'

// const QuestionForm = createForm({
//   action: rhfAction,
//   schema: rhfActionSchema
// })

// function FormState() {
//   const context = QuestionForm.useFormContext()
//   const textValue = QuestionForm.useWatch({
//     name: 'text'
//   })

//   return (
//     <>
//       <h2>FormState</h2>
//       <ul>
//         <li>IsSubmitting? {context.formState.isSubmitting ? 'yes' : 'no'}</li>
//         <li>Field value: {textValue}</li>
//       </ul>
//     </>
//   )
// }

function RenderCount() {
  const renderCount = useRef(1)
  useEffect(() => {
    renderCount.current++
  })
  return (
    <>
      <h2>Render count</h2>
      <ul>
        <li>Render count: {renderCount.current}</li>
      </ul>
    </>
  )
}

export type QuestionFormFactoryProps = {
  className?: string
  question?: LensPillarQuestion
}

export function QuestionFormFactory({
  question,
  ...props
}: QuestionFormFactoryProps) {
  const form = useForm<z.infer<typeof rhfActionSchema>>({
    resolver: zodResolver(rhfActionSchema),
    defaultValues: {
      selectedChoices: []
    }
  })

  const mutation = useAction(rhfAction)
  async function onSubmit(form: z.infer<typeof rhfActionSchema>) {
    console.log(form)
    await mutation.mutateAsync({ ...form })
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="selectedChoices"
            render={() => (
              <FormItem>
                <Card>
                  <CardHeader>
                    <CardTitle>{question?.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {question?.choices?.map(choice => (
                      <FormField
                        key={choice.id}
                        control={form.control}
                        name="selectedChoices"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={choice.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(choice.id)}
                                  onCheckedChange={checked => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          choice.id
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            value => value !== choice.id
                                          )
                                        )
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
                  </CardContent>
                  <CardFooter className="text-sm text-muted-foreground">
                    <FormMessage />
                  </CardFooter>
                </Card>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormControl>
                <Card>
                  <CardHeader>
                    <CardTitle>Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      {...field}
                      className="w-full"
                      placeholder="Add notes here..."
                    />
                  </CardContent>
                  <CardFooter className="text-sm text-muted-foreground">
                    This is optional and will be visible to all users.
                  </CardFooter>
                </Card>
              </FormControl>
            )}
          />

          <Button type="submit">Save and exit</Button>
        </form>
      </Form>
    </>
  )
}
