import { clinicalObservationCreate } from '@/types/clinicalObservationCreate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { NumberField } from '@/components/fields/number-field'
import { useCreateApiObservations } from '@/services/useCreateApiObservations.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type CreateObservationsFormBody = {
  person_id: number
  observation_concept_id: number
  observation_date: string
  observation_datetime?: string | undefined
  observation_type_concept_id: number
  value_as_number?: number | undefined
  value_as_string?: string | undefined
  value_as_concept_id?: number | undefined
  qualifier_concept_id?: number | undefined
  unit_concept_id?: number | undefined
  provider_id?: number | undefined
  visit_occurrence_id?: number | undefined
  visit_detail_id?: number | undefined
  observation_source_value?: string | undefined
  observation_source_concept_id?: number | undefined
  unit_source_value?: string | undefined
  qualifier_source_value?: string | undefined
  value_source_value?: string | undefined
  observation_event_id?: number | undefined
  obs_event_field_concept_id?: number | undefined
}

export const CreateObservationsFormFields = () => {
  return (
    <>
      <IntegerField fieldName={`person_id`} />
      <IntegerField fieldName={`observation_concept_id`} />
      <StringField fieldName={`observation_date`} label="observation_date" />
      <StringField
        fieldName={`observation_datetime`}
        label="observation_datetime"
      />
      <IntegerField fieldName={`observation_type_concept_id`} />
      <NumberField fieldName={`value_as_number`} />
      <StringField fieldName={`value_as_string`} label="value_as_string" />
      <IntegerField fieldName={`value_as_concept_id`} />
      <IntegerField fieldName={`qualifier_concept_id`} />
      <IntegerField fieldName={`unit_concept_id`} />
      <IntegerField fieldName={`provider_id`} />
      <IntegerField fieldName={`visit_occurrence_id`} />
      <IntegerField fieldName={`visit_detail_id`} />
      <StringField
        fieldName={`observation_source_value`}
        label="observation_source_value"
      />
      <IntegerField fieldName={`observation_source_concept_id`} />
      <StringField fieldName={`unit_source_value`} label="unit_source_value" />
      <StringField
        fieldName={`qualifier_source_value`}
        label="qualifier_source_value"
      />
      <StringField
        fieldName={`value_source_value`}
        label="value_source_value"
      />
      <IntegerField fieldName={`observation_event_id`} />
      <IntegerField fieldName={`obs_event_field_concept_id`} />
    </>
  )
}

export type CreateObservationsFormProps = {
  defaultValues: CreateObservationsFormBody
  onSuccess: () => void
}

export type CreateObservationsFormPathParams = Record<string, never>

export const CreateObservationsForm = (props: CreateObservationsFormProps) => {
  const form = useForm<CreateObservationsFormBody>({
    resolver: zodResolver(clinicalObservationCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useCreateApiObservations()

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
        <CreateObservationsFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
