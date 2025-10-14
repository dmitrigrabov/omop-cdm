import { derivedConditionEraCreate } from '@/types/derivedConditionEraCreate.generated.ts'
import { useCreateApiConditionEras } from '@/services/useCreateApiConditionEras.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type CreateConditionErasFormBody = {
  person_id: number
  condition_concept_id: number
  condition_era_start_date: string
  condition_era_end_date: string
  condition_occurrence_count?: number | undefined
}

export type CreateConditionErasFormProps = {
  defaultValues: CreateConditionErasFormBody
  onSuccess: () => void
}

export type CreateConditionErasFormPathParams = Record<string, never>

export const CreateConditionErasForm = (
  props: CreateConditionErasFormProps,
) => {
  const form = useForm<CreateConditionErasFormBody>({
    resolver: zodResolver(derivedConditionEraCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useCreateApiConditionEras()

  useEffect(() => {
    if (mutator.isSuccess && props.onSuccess) {
      props.onSuccess()
    }
  }, [mutator.isSuccess])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((body, event) => {
          event?.preventDefault()

          mutator.mutate({ ...props, body })
        })}
        className="flex flex-col flex-1 gap-4 p-4"
      >
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
