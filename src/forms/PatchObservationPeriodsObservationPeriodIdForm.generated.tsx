import { clinicalObservationPeriodUpdate } from '@/types/clinicalObservationPeriodUpdate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { usePatchApiObservationPeriodsObservationPeriodId } from '@/services/usePatchApiObservationPeriodsObservationPeriodId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchObservationPeriodsObservationPeriodIdFormBody = {
  person_id?: number | undefined
  observation_period_start_date?: string | undefined
  observation_period_end_date?: string | undefined
  period_type_concept_id?: number | undefined
}

export const PatchObservationPeriodsObservationPeriodIdFormFields = () => {
  return (
    <>
      <IntegerField fieldName={`person_id`} />
      <StringField
        fieldName={`observation_period_start_date`}
        label="observation_period_start_date"
      />
      <StringField
        fieldName={`observation_period_end_date`}
        label="observation_period_end_date"
      />
      <IntegerField fieldName={`period_type_concept_id`} />
    </>
  )
}

export type PatchObservationPeriodsObservationPeriodIdFormProps = {
  observation_period_id: number
  defaultValues: PatchObservationPeriodsObservationPeriodIdFormBody
  onSuccess: () => void
}

export type PatchObservationPeriodsObservationPeriodIdFormPathParams = {
  observation_period_id: number
}

export const PatchObservationPeriodsObservationPeriodIdForm = (
  props: PatchObservationPeriodsObservationPeriodIdFormProps,
) => {
  const form = useForm<PatchObservationPeriodsObservationPeriodIdFormBody>({
    resolver: zodResolver(clinicalObservationPeriodUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiObservationPeriodsObservationPeriodId()

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
        <PatchObservationPeriodsObservationPeriodIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
