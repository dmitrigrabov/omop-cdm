import { clinicalObservationPeriodUpdate } from '@/types/clinicalObservationPeriodUpdate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { usePatchApiObservationPeriodsId } from '@/services/usePatchApiObservationPeriodsId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchObservationPeriodsIdFormBody = {
  person_id?: number | undefined
  observation_period_start_date?: string | undefined
  observation_period_end_date?: string | undefined
  period_type_concept_id?: number | undefined
}

export type PatchObservationPeriodsIdFormProps = {
  id: string
  defaultValues: Required<PatchObservationPeriodsIdFormBody>
  onSuccess: () => void
}

export type PatchObservationPeriodsIdFormPathParams = { id: string }

export const PatchObservationPeriodsIdForm = (
  props: PatchObservationPeriodsIdFormProps,
) => {
  const form = useForm<Required<PatchObservationPeriodsIdFormBody>>({
    resolver: zodResolver(clinicalObservationPeriodUpdate.required()),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiObservationPeriodsId()

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
        <StringField
          lens={lens.focus('observation_period_start_date')}
          label="observation_period_start_date"
        />
        <StringField
          lens={lens.focus('observation_period_end_date')}
          label="observation_period_end_date"
        />
        <IntegerField
          lens={lens.focus('period_type_concept_id')}
          label="period_type_concept_id"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
