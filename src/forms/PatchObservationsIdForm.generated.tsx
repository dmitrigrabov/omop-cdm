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

export type PatchObservationsIdFormProps = {
  id: string
  defaultValues: Required<PatchObservationsIdFormBody>
  onSuccess: () => void
}

export type PatchObservationsIdFormPathParams = { id: string }

export const PatchObservationsIdForm = (
  props: PatchObservationsIdFormProps,
) => {
  const form = useForm<Required<PatchObservationsIdFormBody>>({
    resolver: zodResolver(clinicalObservationUpdate.required()),
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
        <IntegerField lens={lens.focus('person_id')} label="person_id" />
        <IntegerField
          lens={lens.focus('observation_concept_id')}
          label="observation_concept_id"
        />
        <StringField
          lens={lens.focus('observation_date')}
          label="observation_date"
        />
        <StringField
          lens={lens.focus('observation_datetime')}
          label="observation_datetime"
        />
        <IntegerField
          lens={lens.focus('observation_type_concept_id')}
          label="observation_type_concept_id"
        />
        <NumberField lens={lens.focus('value_as_number')} />
        <StringField
          lens={lens.focus('value_as_string')}
          label="value_as_string"
        />
        <IntegerField
          lens={lens.focus('value_as_concept_id')}
          label="value_as_concept_id"
        />
        <IntegerField
          lens={lens.focus('qualifier_concept_id')}
          label="qualifier_concept_id"
        />
        <IntegerField
          lens={lens.focus('unit_concept_id')}
          label="unit_concept_id"
        />
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
          lens={lens.focus('observation_source_value')}
          label="observation_source_value"
        />
        <IntegerField
          lens={lens.focus('observation_source_concept_id')}
          label="observation_source_concept_id"
        />
        <StringField
          lens={lens.focus('unit_source_value')}
          label="unit_source_value"
        />
        <StringField
          lens={lens.focus('qualifier_source_value')}
          label="qualifier_source_value"
        />
        <StringField
          lens={lens.focus('value_source_value')}
          label="value_source_value"
        />
        <IntegerField
          lens={lens.focus('observation_event_id')}
          label="observation_event_id"
        />
        <IntegerField
          lens={lens.focus('obs_event_field_concept_id')}
          label="obs_event_field_concept_id"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
