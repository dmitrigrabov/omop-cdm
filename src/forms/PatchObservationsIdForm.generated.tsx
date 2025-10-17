import { clinicalObservationUpdate } from '@/types/clinicalObservationUpdate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { NumberField } from '@/components/fields/number-field'
import { usePatchApiObservationsId } from '@/services/usePatchApiObservationsId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchObservationsIdFormBody = {
  person_id?: number | undefined
  observation_concept_id?: number | undefined
  observation_date?: string | undefined
  observation_datetime?: string | undefined
  observation_type_concept_id?: number | undefined
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

export const PatchObservationsIdFormFields = () => {
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

export type PatchObservationsIdFormProps = {
  id: number
  defaultValues: PatchObservationsIdFormBody
  onSuccess: () => void
}

export type PatchObservationsIdFormPathParams = { id: number }

export const PatchObservationsIdForm = (
  props: PatchObservationsIdFormProps,
) => {
  const form = useForm<PatchObservationsIdFormBody>({
    resolver: zodResolver(clinicalObservationUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiObservationsId()

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
        <PatchObservationsIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
