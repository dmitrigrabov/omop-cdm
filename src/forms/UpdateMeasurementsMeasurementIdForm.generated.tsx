import { clinicalMeasurementCreate } from '@/types/clinicalMeasurementCreate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { NumberField } from '@/components/fields/number-field'
import { useUpdateApiMeasurementsMeasurementId } from '@/services/useUpdateApiMeasurementsMeasurementId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateMeasurementsMeasurementIdFormBody = {
  person_id: number
  measurement_concept_id: number
  measurement_date: string
  measurement_datetime?: string | undefined
  measurement_time?: string | undefined
  measurement_type_concept_id: number
  operator_concept_id?: number | undefined
  value_as_number?: number | undefined
  value_as_concept_id?: number | undefined
  unit_concept_id?: number | undefined
  range_low?: number | undefined
  range_high?: number | undefined
  provider_id?: number | undefined
  visit_occurrence_id?: number | undefined
  visit_detail_id?: number | undefined
  measurement_source_value?: string | undefined
  measurement_source_concept_id?: number | undefined
  unit_source_value?: string | undefined
  unit_source_concept_id?: number | undefined
  value_source_value?: string | undefined
  measurement_event_id?: number | undefined
  meas_event_field_concept_id?: number | undefined
}

export const UpdateMeasurementsMeasurementIdFormFields = () => {
  return (
    <>
      <IntegerField fieldName={`person_id`} />
      <IntegerField fieldName={`measurement_concept_id`} />
      <StringField fieldName={`measurement_date`} label="measurement_date" />
      <StringField
        fieldName={`measurement_datetime`}
        label="measurement_datetime"
      />
      <StringField fieldName={`measurement_time`} label="measurement_time" />
      <IntegerField fieldName={`measurement_type_concept_id`} />
      <IntegerField fieldName={`operator_concept_id`} />
      <NumberField fieldName={`value_as_number`} />
      <IntegerField fieldName={`value_as_concept_id`} />
      <IntegerField fieldName={`unit_concept_id`} />
      <NumberField fieldName={`range_low`} />
      <NumberField fieldName={`range_high`} />
      <IntegerField fieldName={`provider_id`} />
      <IntegerField fieldName={`visit_occurrence_id`} />
      <IntegerField fieldName={`visit_detail_id`} />
      <StringField
        fieldName={`measurement_source_value`}
        label="measurement_source_value"
      />
      <IntegerField fieldName={`measurement_source_concept_id`} />
      <StringField fieldName={`unit_source_value`} label="unit_source_value" />
      <IntegerField fieldName={`unit_source_concept_id`} />
      <StringField
        fieldName={`value_source_value`}
        label="value_source_value"
      />
      <IntegerField fieldName={`measurement_event_id`} />
      <IntegerField fieldName={`meas_event_field_concept_id`} />
    </>
  )
}

export type UpdateMeasurementsMeasurementIdFormProps = {
  measurement_id: number
  defaultValues: UpdateMeasurementsMeasurementIdFormBody
  onSuccess: () => void
}

export type UpdateMeasurementsMeasurementIdFormPathParams = {
  measurement_id: number
}

export const UpdateMeasurementsMeasurementIdForm = (
  props: UpdateMeasurementsMeasurementIdFormProps,
) => {
  const form = useForm<UpdateMeasurementsMeasurementIdFormBody>({
    resolver: zodResolver(clinicalMeasurementCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiMeasurementsMeasurementId()

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
        <UpdateMeasurementsMeasurementIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
