import { clinicalObservationPeriodCreate } from '@/types/clinicalObservationPeriodCreate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { useUpdateApiObservationPeriodsId } from '@/services/useUpdateApiObservationPeriodsId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateObservationPeriodsIdFormBody = {
  person_id: number
  observation_period_start_date: string
  observation_period_end_date: string
  period_type_concept_id: number
}

export const UpdateObservationPeriodsIdFormFields = () => {
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

export type UpdateObservationPeriodsIdFormProps = {
  id: number
  defaultValues: UpdateObservationPeriodsIdFormBody
  onSuccess: () => void
}

export type UpdateObservationPeriodsIdFormPathParams = { id: number }

export const UpdateObservationPeriodsIdForm = (
  props: UpdateObservationPeriodsIdFormProps,
) => {
  const form = useForm<UpdateObservationPeriodsIdFormBody>({
    resolver: zodResolver(clinicalObservationPeriodCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiObservationPeriodsId()

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
        <UpdateObservationPeriodsIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
