import { clinicalConditionOccurrenceCreate } from '@/types/clinicalConditionOccurrenceCreate.generated.ts'
import { useUpdateApiConditionOccurrencesConditionOccurrenceId } from '@/services/useUpdateApiConditionOccurrencesConditionOccurrenceId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateConditionOccurrencesConditionOccurrenceIdFormBody = {
  person_id: number
  condition_concept_id: number
  condition_start_date: string
  condition_start_datetime?: string | undefined
  condition_end_date?: string | undefined
  condition_end_datetime?: string | undefined
  condition_type_concept_id: number
  condition_status_concept_id?: number | undefined
  stop_reason?: string | undefined
  provider_id?: number | undefined
  visit_occurrence_id?: number | undefined
  visit_detail_id?: number | undefined
  condition_source_value?: string | undefined
  condition_source_concept_id?: number | undefined
  condition_status_source_value?: string | undefined
}

export type UpdateConditionOccurrencesConditionOccurrenceIdFormProps = {
  condition_occurrence_id: number
  defaultValues: UpdateConditionOccurrencesConditionOccurrenceIdFormBody
  onSuccess: () => void
}

export type UpdateConditionOccurrencesConditionOccurrenceIdFormPathParams = {
  condition_occurrence_id: number
}

export const UpdateConditionOccurrencesConditionOccurrenceIdForm = (
  props: UpdateConditionOccurrencesConditionOccurrenceIdFormProps,
) => {
  const form = useForm<UpdateConditionOccurrencesConditionOccurrenceIdFormBody>(
    {
      resolver: zodResolver(clinicalConditionOccurrenceCreate),
      defaultValues: props.defaultValues,
    },
  )

  const lens = useLens(form)

  const mutator = useUpdateApiConditionOccurrencesConditionOccurrenceId()

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
