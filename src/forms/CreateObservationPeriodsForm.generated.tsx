import { clinicalObservationPeriodCreate } from '@/types/clinicalObservationPeriodCreate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { useCreateApiObservationPeriods } from '@/services/useCreateApiObservationPeriods.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type CreateObservationPeriodsFormBody = {
  person_id: number
  observation_period_start_date: string
  observation_period_end_date: string
  period_type_concept_id: number
}

export type CreateObservationPeriodsFormProps = {
  defaultValues: Required<CreateObservationPeriodsFormBody>
  onSuccess: () => void
}

export type CreateObservationPeriodsFormPathParams = Record<string, never>

export const CreateObservationPeriodsForm = (
  props: CreateObservationPeriodsFormProps,
) => {
  const form = useForm<Required<CreateObservationPeriodsFormBody>>({
    resolver: zodResolver(clinicalObservationPeriodCreate.required()),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useCreateApiObservationPeriods()

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
