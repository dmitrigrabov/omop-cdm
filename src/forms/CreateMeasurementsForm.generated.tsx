import { clinicalMeasurementCreate } from '@/types/clinicalMeasurementCreate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { NumberField } from '@/components/fields/number-field'
import { useCreateApiMeasurements } from '@/services/useCreateApiMeasurements.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type CreateMeasurementsFormBody = {
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

export type CreateMeasurementsFormProps = {
  defaultValues: Required<CreateMeasurementsFormBody>
  onSuccess: () => void
}

export type CreateMeasurementsFormPathParams = Record<string, never>

export const CreateMeasurementsForm = (props: CreateMeasurementsFormProps) => {
  const form = useForm<Required<CreateMeasurementsFormBody>>({
    resolver: zodResolver(clinicalMeasurementCreate.required()),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useCreateApiMeasurements()

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
        <IntegerField lens={lens.focus('person_id')} label="person_id" />
        <IntegerField
          lens={lens.focus('measurement_concept_id')}
          label="measurement_concept_id"
        />
        <StringField
          lens={lens.focus('measurement_date')}
          label="measurement_date"
        />
        <StringField
          lens={lens.focus('measurement_datetime')}
          label="measurement_datetime"
        />
        <StringField
          lens={lens.focus('measurement_time')}
          label="measurement_time"
        />
        <IntegerField
          lens={lens.focus('measurement_type_concept_id')}
          label="measurement_type_concept_id"
        />
        <IntegerField
          lens={lens.focus('operator_concept_id')}
          label="operator_concept_id"
        />
        <NumberField lens={lens.focus('value_as_number')} />
        <IntegerField
          lens={lens.focus('value_as_concept_id')}
          label="value_as_concept_id"
        />
        <IntegerField
          lens={lens.focus('unit_concept_id')}
          label="unit_concept_id"
        />
        <NumberField lens={lens.focus('range_low')} />
        <NumberField lens={lens.focus('range_high')} />
        <IntegerField lens={lens.focus('provider_id')} label="provider_id" />
        <IntegerField
          lens={lens.focus('visit_occurrence_id')}
          label="visit_occurrence_id"
        />
        <IntegerField
          lens={lens.focus('visit_detail_id')}
          label="visit_detail_id"
        />
        <StringField
          lens={lens.focus('measurement_source_value')}
          label="measurement_source_value"
        />
        <IntegerField
          lens={lens.focus('measurement_source_concept_id')}
          label="measurement_source_concept_id"
        />
        <StringField
          lens={lens.focus('unit_source_value')}
          label="unit_source_value"
        />
        <IntegerField
          lens={lens.focus('unit_source_concept_id')}
          label="unit_source_concept_id"
        />
        <StringField
          lens={lens.focus('value_source_value')}
          label="value_source_value"
        />
        <IntegerField
          lens={lens.focus('measurement_event_id')}
          label="measurement_event_id"
        />
        <IntegerField
          lens={lens.focus('meas_event_field_concept_id')}
          label="meas_event_field_concept_id"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
