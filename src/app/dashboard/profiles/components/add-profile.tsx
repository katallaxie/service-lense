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

import { addProfile } from '@/db/services/profiles'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRef } from 'react'
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

import useSWR from 'swr'

const FormSchema = z.object({
  name: z.string().min(3, {}),
  description: z
    .string()
    .min(10, {
      message: 'Description must be at least 30 characters.'
    })
    .max(2024, {
      message: 'Description must be less than 2024 characters.'
    })
})

const updateProfiles = () => fetch('/api/profiles').then(res => res.json())

const createProfile = (form: z.infer<typeof FormSchema>) =>
  fetch('/api/profiles', {
    method: 'POST',
    body: JSON.stringify(form)
  }).then(res => res.json())

export function AddProfileDialog() {
  const { data, mutate, isLoading } = useSWR('/api/profiles', updateProfiles)
  const { toast } = useToast()
  const closeDialog = useRef<HTMLButtonElement>(null)

  const dialogClose = () => closeDialog.current && closeDialog.current.click()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      description: ''
    }
  })

  async function onSubmit(form: z.infer<typeof FormSchema>) {
    try {
      const profile = await createProfile(form)

      // await mutate({ ...data, rows: [...data.rows, form] }, true)

      toast({
        title: `Created ${profile.name} profile`
      })

      dialogClose()
    } catch (e) {}
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button ref={closeDialog} variant="outline">
          Add Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Profile</DialogTitle>
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
                        placeholder="Give it a descriptive name."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The name of the profile to create.
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
                        placeholder="Tell us a bit about the profile."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A description about the profile you create.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddProfileDialog
