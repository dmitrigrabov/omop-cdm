import { clinicalConditionOccurrenceUpdate } from '@/types/clinicalConditionOccurrenceUpdate.generated.ts'
import { usePatchApiConditionOccurrencesConditionOccurrenceId } from '@/services/usePatchApiConditionOccurrencesConditionOccurrenceId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchConditionOccurrencesConditionOccurrenceIdFormBody = {
  person_id?: number | undefined
  condition_concept_id?: number | undefined
  condition_start_date?: string | undefined
  condition_start_datetime?: string | undefined
  condition_end_date?: string | undefined
  condition_end_datetime?: string | undefined
  condition_type_concept_id?: number | undefined
  condition_status_concept_id?: number | undefined
  stop_reason?: string | undefined
  provider_id?: number | undefined
  visit_occurrence_id?: number | undefined
  visit_detail_id?: number | undefined
  condition_source_value?: string | undefined
  condition_source_concept_id?: number | undefined
  condition_status_source_value?: string | undefined
}

export type PatchConditionOccurrencesConditionOccurrenceIdFormProps = {
  condition_occurrence_id: number
  defaultValues: PatchConditionOccurrencesConditionOccurrenceIdFormBody
  onSuccess: () => void
}

export type PatchConditionOccurrencesConditionOccurrenceIdFormPathParams = {
  condition_occurrence_id: number
}

export const PatchConditionOccurrencesConditionOccurrenceIdForm = (
  props: PatchConditionOccurrencesConditionOccurrenceIdFormProps,
) => {
  const form = useForm<PatchConditionOccurrencesConditionOccurrenceIdFormBody>({
    resolver: zodResolver(clinicalConditionOccurrenceUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiConditionOccurrencesConditionOccurrenceId()

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
