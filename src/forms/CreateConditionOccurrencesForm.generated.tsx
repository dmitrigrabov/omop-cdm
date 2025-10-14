import { clinicalConditionOccurrenceCreate } from '@/types/clinicalConditionOccurrenceCreate.generated.ts'
import { useCreateApiConditionOccurrences } from '@/services/useCreateApiConditionOccurrences.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type CreateConditionOccurrencesFormBody = {
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

export type CreateConditionOccurrencesFormProps = {
  defaultValues: CreateConditionOccurrencesFormBody
  onSuccess: () => void
}

export type CreateConditionOccurrencesFormPathParams = Record<string, never>

export const CreateConditionOccurrencesForm = (
  props: CreateConditionOccurrencesFormProps,
) => {
  const form = useForm<CreateConditionOccurrencesFormBody>({
    resolver: zodResolver(clinicalConditionOccurrenceCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useCreateApiConditionOccurrences()

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
