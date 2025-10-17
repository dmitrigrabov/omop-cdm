import { clinicalVisitOccurrenceCreate } from '@/types/clinicalVisitOccurrenceCreate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { useUpdateApiVisitOccurrencesId } from '@/services/useUpdateApiVisitOccurrencesId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateVisitOccurrencesIdFormBody = {
  person_id: number
  visit_concept_id: number
  visit_start_date: string
  visit_start_datetime?: string | undefined
  visit_end_date: string
  visit_end_datetime?: string | undefined
  visit_type_concept_id: number
  provider_id?: number | undefined
  care_site_id?: number | undefined
  visit_source_value?: string | undefined
  visit_source_concept_id?: number | undefined
  admitted_from_concept_id?: number | undefined
  admitted_from_source_value?: string | undefined
  discharged_to_concept_id?: number | undefined
  discharged_to_source_value?: string | undefined
  preceding_visit_occurrence_id?: number | undefined
}

export const UpdateVisitOccurrencesIdFormFields = () => {
  return (
    <>
      <IntegerField fieldName={`person_id`} />
      <IntegerField fieldName={`visit_concept_id`} />
      <StringField fieldName={`visit_start_date`} label="visit_start_date" />
      <StringField
        fieldName={`visit_start_datetime`}
        label="visit_start_datetime"
      />
      <StringField fieldName={`visit_end_date`} label="visit_end_date" />
      <StringField
        fieldName={`visit_end_datetime`}
        label="visit_end_datetime"
      />
      <IntegerField fieldName={`visit_type_concept_id`} />
      <IntegerField fieldName={`provider_id`} />
      <IntegerField fieldName={`care_site_id`} />
      <StringField
        fieldName={`visit_source_value`}
        label="visit_source_value"
      />
      <IntegerField fieldName={`visit_source_concept_id`} />
      <IntegerField fieldName={`admitted_from_concept_id`} />
      <StringField
        fieldName={`admitted_from_source_value`}
        label="admitted_from_source_value"
      />
      <IntegerField fieldName={`discharged_to_concept_id`} />
      <StringField
        fieldName={`discharged_to_source_value`}
        label="discharged_to_source_value"
      />
      <IntegerField fieldName={`preceding_visit_occurrence_id`} />
    </>
  )
}

export type UpdateVisitOccurrencesIdFormProps = {
  id: number
  defaultValues: UpdateVisitOccurrencesIdFormBody
  onSuccess: () => void
}

export type UpdateVisitOccurrencesIdFormPathParams = { id: number }

export const UpdateVisitOccurrencesIdForm = (
  props: UpdateVisitOccurrencesIdFormProps,
) => {
  const form = useForm<UpdateVisitOccurrencesIdFormBody>({
    resolver: zodResolver(clinicalVisitOccurrenceCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiVisitOccurrencesId()

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
        <UpdateVisitOccurrencesIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
