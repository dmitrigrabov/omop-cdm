import { clinicalObservationUpdate } from '@/types/clinicalObservationUpdate.generated.ts'
import { usePatchApiObservationsObservationId } from '@/services/usePatchApiObservationsObservationId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchObservationsObservationIdFormBody = {
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

export type PatchObservationsObservationIdFormProps = {
  observation_id: number
  defaultValues: PatchObservationsObservationIdFormBody
  onSuccess: () => void
}

export type PatchObservationsObservationIdFormPathParams = {
  observation_id: number
}

export const PatchObservationsObservationIdForm = (
  props: PatchObservationsObservationIdFormProps,
) => {
  const form = useForm<PatchObservationsObservationIdFormBody>({
    resolver: zodResolver(clinicalObservationUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiObservationsObservationId()

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
