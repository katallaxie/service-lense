'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useRef } from 'react'
import { useAction } from '@/trpc/client'
import { rhfAction } from './add-solution.action'
import { zodResolver } from '@hookform/resolvers/zod'
import { rhfActionSchema } from './add-solution.schema'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
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

export default function AddSolutionDialog() {
  const { toast } = useToast()
  const closeDialog = useRef<HTMLButtonElement>(null)
  const dialogClose = () => closeDialog.current && closeDialog.current.click()

  const form = useForm<z.infer<typeof rhfActionSchema>>({
    resolver: zodResolver(rhfActionSchema)
  })

  const mutation = useAction(rhfAction)
  async function onSubmit(form: z.infer<typeof rhfActionSchema>) {
    await mutation.mutateAsync({ ...form })
    dialogClose()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button ref={closeDialog} variant="outline">
          Add Solution
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Solution</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
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
                    <FormDescription>The name of the solution</FormDescription>
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
                        placeholder="Tell us a bit about the solution."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This creates a new solution. Solutions contain ADRs and
                      other important information.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={
                  form.formState.isSubmitting || !form.formState.isValid
                }
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
