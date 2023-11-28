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
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

import { zodResolver } from '@hookform/resolvers/zod'
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

const MAX_SIZE_MB = 1

const FormSchema = z.object({
  name: z.string().min(3, {}),
  spec: z.union([
    z
      .custom<FileList>()
      .transform(file => file.length > 0 && file.item(0))
      .refine(file => file),
    z.string()
  ]),

  description: z
    .string()
    .min(10, {
      message: 'Description must be at least 30 characters.'
    })
    .max(2024, {
      message: 'Description must be less than 2024 characters.'
    })
})

const update = () => fetch('/api/profiles').then(res => res.json())

const createLens = (form: z.infer<typeof FormSchema>) =>
  fetch('/api/lenses', {
    method: 'POST',
    body: JSON.stringify(form)
  }).then(res => res.json())

export function AddLensDialog() {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {}
  })

  const readJSONFile = async (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = event => resolve(event.target?.result as string)
      reader.onerror = error => reject(error)
      reader.readAsText(file)
    })

  async function onSubmit(form: z.infer<typeof FormSchema>) {
    try {
      const spec = await readJSONFile(form.spec! as File)
      form.spec = spec

      // const reader = new FileReader()
      // reader.onload = async e => {
      //   const content = e.target?.result
      //   console.log(content)
      // }
      // reader.readAsBinaryString(spec)

      const lens = await createLens(form)

      // await fetch('/api/workloads', {
      //   method: 'POST',
      //   body: JSON.stringify(form)
      // })

      console.log(lens)

      // await mutate({ ...data, rows: [...data.rows, form] }, true)

      toast({
        title: 'Workload created'
      })
    } catch (e) {}
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Lens</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Lens</DialogTitle>
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
                      The business context for a workload.
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
                      A detailed description of the business context.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="spec"
                render={({ field: { onChange }, ...field }) => (
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <FormLabel>Specification</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        disabled={form.formState.isSubmitting}
                        placeholder=""
                        {...field}
                        onChange={event => {
                          const dataTransfer = new DataTransfer()

                          Array.from(event.target.files!).forEach(spec =>
                            dataTransfer.items.add(spec)
                          )

                          const newFiles = dataTransfer.files
                          onChange(newFiles)
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      The business context for a workload.
                    </FormDescription>
                    <FormMessage />
                  </div>
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

export default AddLensDialog
