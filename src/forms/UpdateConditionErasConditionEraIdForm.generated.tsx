import { derivedConditionEraCreate } from '@/types/derivedConditionEraCreate.generated.ts'
import { useUpdateApiConditionErasConditionEraId } from '@/services/useUpdateApiConditionErasConditionEraId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateConditionErasConditionEraIdFormBody = {
  person_id: number
  condition_concept_id: number
  condition_era_start_date: string
  condition_era_end_date: string
  condition_occurrence_count?: number | undefined
}

export type UpdateConditionErasConditionEraIdFormProps = {
  condition_era_id: number
  defaultValues: UpdateConditionErasConditionEraIdFormBody
  onSuccess: () => void
}

export type UpdateConditionErasConditionEraIdFormPathParams = {
  condition_era_id: number
}

export const UpdateConditionErasConditionEraIdForm = (
  props: UpdateConditionErasConditionEraIdFormProps,
) => {
  const form = useForm<UpdateConditionErasConditionEraIdFormBody>({
    resolver: zodResolver(derivedConditionEraCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiConditionErasConditionEraId()

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
