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
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
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
import { z } from 'zod'
import { useAction } from '@/trpc/client'
import { rhfAction } from './question-form.action'
import { WorkloadLensesAnswer, LensPillarQuestion } from '@/db'

export type QuestionFormFactoryProps = {
  className?: string
  question?: LensPillarQuestion
  workloadId: string
  lensPillarQuestionId: string
  answer: WorkloadLensesAnswer | null
}

export function QuestionFormFactory({
  answer,
  question,
  workloadId,
  lensPillarQuestionId,
  ...props
}: QuestionFormFactoryProps) {
  const form = useForm<z.infer<typeof rhfActionSchema>>({
    resolver: zodResolver(rhfActionSchema),
    defaultValues: {
      workloadId,
      lensPillarQuestionId,
      // answerId: answer?.id,
      selectedChoices: answer?.lensChoices?.map(choice => choice.id) ?? [],
      doesNotApply: answer?.doesNotApply,
      doesNotApplyReason: answer?.doesNotApplyReason
    }
  })

  const mutation = useAction(rhfAction)
  async function onSubmit(form: z.infer<typeof rhfActionSchema>) {
    await mutation.mutateAsync({ ...form })
  }

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
            name="selectedChoices"
            render={() => (
              <FormItem>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">{question?.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {question?.questionAnswers?.map(choice => (
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
                                  disabled={form.watch('doesNotApply')}
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
                    <CardDescription>{question?.description}</CardDescription>
                    <FormMessage />
                  </CardFooter>
                </Card>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="doesNotApply"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Question does not apply to this workload
                  </FormLabel>
                  <FormDescription>
                    Please, provide a reason why this question does not applies.
                  </FormDescription>
                  <FormMessage />
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="doesNotApplyReason"
            render={({ field }) => (
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!form.watch('doesNotApply')}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="OUT_OF_SCOPE">Out of Scope</SelectItem>
                    <SelectItem value="PRIORITIES">
                      Business Priorities
                    </SelectItem>
                    <SelectItem value="CONSTRAINTS">
                      Architecture Constraints
                    </SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <div className="grid w-full">
                <FormControl>
                  <Textarea
                    {...field}
                    className="w-full"
                    placeholder="Add some notes ..."
                  />
                </FormControl>
                <FormDescription>
                  This is optional and will be visible to all users.
                </FormDescription>
                <FormMessage />
              </div>
            )}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting || !form.formState.isValid}
          >
            Save and exit
          </Button>
        </form>
      </Form>
    </>
  )
}
