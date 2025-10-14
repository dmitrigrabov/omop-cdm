import { clinicalMeasurementUpdate } from '@/types/clinicalMeasurementUpdate.generated.ts'
import { usePatchApiMeasurementsMeasurementId } from '@/services/usePatchApiMeasurementsMeasurementId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchMeasurementsMeasurementIdFormBody = {
  person_id?: number | undefined
  measurement_concept_id?: number | undefined
  measurement_date?: string | undefined
  measurement_datetime?: string | undefined
  measurement_time?: string | undefined
  measurement_type_concept_id?: number | undefined
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

export type PatchMeasurementsMeasurementIdFormProps = {
  measurement_id: number
  defaultValues: PatchMeasurementsMeasurementIdFormBody
  onSuccess: () => void
}

export type PatchMeasurementsMeasurementIdFormPathParams = {
  measurement_id: number
}

export const PatchMeasurementsMeasurementIdForm = (
  props: PatchMeasurementsMeasurementIdFormProps,
) => {
  const form = useForm<PatchMeasurementsMeasurementIdFormBody>({
    resolver: zodResolver(clinicalMeasurementUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiMeasurementsMeasurementId()

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
