'use client'

import { PropsWithChildren } from 'react'
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
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { rhfActionSchema } from './new-form.schema'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ProfileQuestion } from '@/db/models/profile-question'
import { Checkbox } from '@/components/ui/checkbox'
import { defaultValues } from './new-form.schema'

export type EditProfileFormProps = {
  questions?: ProfileQuestion[]
  selectedChoices?: Record<string, string[]>
}

export function EditProfileForm({
  questions,
  selectedChoices
}: PropsWithChildren<EditProfileFormProps>) {
  const form = useForm<z.infer<typeof rhfActionSchema>>({
    resolver: zodResolver(rhfActionSchema),
    defaultValues: {
      ...defaultValues,
      selectedChoices
    },
    mode: 'onChange'
  })

  return (
    <>
      <Form {...form}>
        <form className="space-y-8" autoComplete="off">
          {questions?.map((question, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle>{question?.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {question.isMultiple ? (
                  <div key={idx}>
                    {question?.choices?.map(choice => (
                      <FormField
                        key={choice.id}
                        control={form.control}
                        name={`selectedChoices.${question.ref}`}
                        render={({ field, ...rest }) => {
                          return (
                            <FormItem
                              key={choice.id}
                              className="flex flex-row items-start space-y-0 my-4"
                            >
                              <FormControl>
                                <Checkbox
                                  className="mr-2"
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
                  </div>
                ) : (
                  <FormField
                    key={idx}
                    control={form.control}
                    name={`selectedChoices.${question.ref}`}
                    render={({ field }) => (
                      <div className="grid w-full">
                        <FormControl>
                          <Select
                            onValueChange={value => {
                              field.onChange([value])
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
                )}
              </CardContent>
            </Card>
          ))}

          <Button
            type="submit"
            disabled={form.formState.isSubmitting || !form.formState.isValid}
          >
            Add Profile
          </Button>
          <input
            autoComplete="false"
            name="hidden"
            type="text"
            style={{ display: 'none' }}
          ></input>
        </form>
      </Form>
    </>
  )
}
