'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { UseTRPCActionResult } from '@trpc/next/app-dir/client'
import { TRPCActionHandler } from '@trpc/next/app-dir/server'
import { useAction } from '@/trpc/client'
import { useRef } from 'react'
import {
  useForm,
  useFormContext,
  UseFormProps,
  UseFormReturn,
  useWatch
} from 'react-hook-form'
import { z } from 'zod'

/**
 * @internal
 */
export interface ActionHandlerDef {
  input?: any
  output?: any
  errorShape: any
}

export function createForm<TDef extends ActionHandlerDef>(opts: {
  action: TRPCActionHandler<TDef>
  schema: z.ZodSchema<any> & { _input: TDef['input'] }
  hookProps?: Omit<UseFormProps<TDef['input']>, 'resolver'>
}) {
  type FormValues = TDef['input']
  function Form(
    props: Omit<
      JSX.IntrinsicElements['form'],
      'action' | 'encType' | 'method' | 'onSubmit' | 'ref'
    > & {
      render: (renderProps: {
        form: UseFormReturn<FormValues>
        action: UseTRPCActionResult<TDef>
      }) => React.ReactNode
    }
  ) {
    const hook = useForm<FormValues>({
      ...opts.hookProps,
      resolver: zodResolver(opts.schema, undefined)
    })
    const ref = useRef<HTMLFormElement>(null)
    const action = useAction(opts.action)
    const { render, ...passThrough }: typeof props = props

    return (
      <Form {...hook} render={({ field }) => }>
        {/* <form
          {...passThrough}
          action={opts.action}
          ref={ref}
          onSubmit={hook.handleSubmit(() =>
            action.mutateAsync(new FormData(ref.current!) as any)
          )}
        >
          {render({ form: hook, action })}
        </form> */}
      </Form>
    )
  }

  Form.useWatch = useWatch<FormValues>
  Form.useFormContext = useFormContext<FormValues>

  return Form
}
