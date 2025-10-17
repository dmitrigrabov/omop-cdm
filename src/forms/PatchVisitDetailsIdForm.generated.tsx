import { clinicalVisitDetailUpdate } from '@/types/clinicalVisitDetailUpdate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { usePatchApiVisitDetailsId } from '@/services/usePatchApiVisitDetailsId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchVisitDetailsIdFormBody = {
  person_id?: number | undefined
  visit_detail_concept_id?: number | undefined
  visit_detail_start_date?: string | undefined
  visit_detail_start_datetime?: string | undefined
  visit_detail_end_date?: string | undefined
  visit_detail_end_datetime?: string | undefined
  visit_detail_type_concept_id?: number | undefined
  provider_id?: number | undefined
  care_site_id?: number | undefined
  visit_detail_source_value?: string | undefined
  visit_detail_source_concept_id?: number | undefined
  admitted_from_concept_id?: number | undefined
  admitted_from_source_value?: string | undefined
  discharged_to_source_value?: string | undefined
  discharged_to_concept_id?: number | undefined
  preceding_visit_detail_id?: number | undefined
  parent_visit_detail_id?: number | undefined
  visit_occurrence_id?: number | undefined
}

export const PatchVisitDetailsIdFormFields = () => {
  return (
    <>
      <IntegerField fieldName={`person_id`} />
      <IntegerField fieldName={`visit_detail_concept_id`} />
      <StringField
        fieldName={`visit_detail_start_date`}
        label="visit_detail_start_date"
      />
      <StringField
        fieldName={`visit_detail_start_datetime`}
        label="visit_detail_start_datetime"
      />
      <StringField
        fieldName={`visit_detail_end_date`}
        label="visit_detail_end_date"
      />
      <StringField
        fieldName={`visit_detail_end_datetime`}
        label="visit_detail_end_datetime"
      />
      <IntegerField fieldName={`visit_detail_type_concept_id`} />
      <IntegerField fieldName={`provider_id`} />
      <IntegerField fieldName={`care_site_id`} />
      <StringField
        fieldName={`visit_detail_source_value`}
        label="visit_detail_source_value"
      />
      <IntegerField fieldName={`visit_detail_source_concept_id`} />
      <IntegerField fieldName={`admitted_from_concept_id`} />
      <StringField
        fieldName={`admitted_from_source_value`}
        label="admitted_from_source_value"
      />
      <StringField
        fieldName={`discharged_to_source_value`}
        label="discharged_to_source_value"
      />
      <IntegerField fieldName={`discharged_to_concept_id`} />
      <IntegerField fieldName={`preceding_visit_detail_id`} />
      <IntegerField fieldName={`parent_visit_detail_id`} />
      <IntegerField fieldName={`visit_occurrence_id`} />
    </>
  )
}

export type PatchVisitDetailsIdFormProps = {
  id: number
  defaultValues: PatchVisitDetailsIdFormBody
  onSuccess: () => void
}

export type PatchVisitDetailsIdFormPathParams = { id: number }

export const PatchVisitDetailsIdForm = (
  props: PatchVisitDetailsIdFormProps,
) => {
  const form = useForm<PatchVisitDetailsIdFormBody>({
    resolver: zodResolver(clinicalVisitDetailUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiVisitDetailsId()

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
        <PatchVisitDetailsIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
