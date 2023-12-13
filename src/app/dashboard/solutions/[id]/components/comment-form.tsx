'use client'

import { useEffect, useRef } from 'react'
import { Form, FormControl, FormField } from '@/components/ui/form'
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
import { rhfActionSchema } from './comment-form.schema'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useAction } from '@/trpc/client'
import { rhfAction } from './comment-form.action'
import { WorkloadLensPillarAnswer } from '@/db'

export type CommentFormProps = {
  className?: string
  solutionId?: string
}

export function CommentForm({ solutionId, ...props }: CommentFormProps) {
  const form = useForm<z.infer<typeof rhfActionSchema>>({
    resolver: zodResolver(rhfActionSchema)
  })

  const mutation = useAction(rhfAction)
  async function onSubmit(form: z.infer<typeof rhfActionSchema>) {
    await mutation.mutateAsync({ ...form })
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormControl>
                <Card>
                  <CardContent className="pt-6">
                    <Textarea
                      {...field}
                      className="w-full"
                      placeholder="Add your comment..."
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <CardDescription>Markdown is supported.</CardDescription>
                    <Button
                      variant="outline"
                      type="submit"
                      disabled={form.formState.isSubmitting}
                    >
                      Comment
                    </Button>
                  </CardFooter>
                </Card>
              </FormControl>
            )}
          />
          <div className="flex justify-end"></div>
        </form>
      </Form>
    </>
  )
}
