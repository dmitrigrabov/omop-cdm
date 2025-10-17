import { clinicalConditionOccurrenceCreate } from '@/types/clinicalConditionOccurrenceCreate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { useUpdateApiConditionOccurrencesId } from '@/services/useUpdateApiConditionOccurrencesId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateConditionOccurrencesIdFormBody = {
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

export const UpdateConditionOccurrencesIdFormFields = () => {
  return (
    <>
      <IntegerField fieldName={`person_id`} />
      <IntegerField fieldName={`condition_concept_id`} />
      <StringField
        fieldName={`condition_start_date`}
        label="condition_start_date"
      />
      <StringField
        fieldName={`condition_start_datetime`}
        label="condition_start_datetime"
      />
      <StringField
        fieldName={`condition_end_date`}
        label="condition_end_date"
      />
      <StringField
        fieldName={`condition_end_datetime`}
        label="condition_end_datetime"
      />
      <IntegerField fieldName={`condition_type_concept_id`} />
      <IntegerField fieldName={`condition_status_concept_id`} />
      <StringField fieldName={`stop_reason`} label="stop_reason" />
      <IntegerField fieldName={`provider_id`} />
      <IntegerField fieldName={`visit_occurrence_id`} />
      <IntegerField fieldName={`visit_detail_id`} />
      <StringField
        fieldName={`condition_source_value`}
        label="condition_source_value"
      />
      <IntegerField fieldName={`condition_source_concept_id`} />
      <StringField
        fieldName={`condition_status_source_value`}
        label="condition_status_source_value"
      />
    </>
  )
}

export type UpdateConditionOccurrencesIdFormProps = {
  id: number
  defaultValues: UpdateConditionOccurrencesIdFormBody
  onSuccess: () => void
}

export type UpdateConditionOccurrencesIdFormPathParams = { id: number }

export const UpdateConditionOccurrencesIdForm = (
  props: UpdateConditionOccurrencesIdFormProps,
) => {
  const form = useForm<UpdateConditionOccurrencesIdFormBody>({
    resolver: zodResolver(clinicalConditionOccurrenceCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiConditionOccurrencesId()

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
        <UpdateConditionOccurrencesIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
