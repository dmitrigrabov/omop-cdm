import { clinicalMeasurementCreate } from '@/types/clinicalMeasurementCreate.generated.ts'
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
