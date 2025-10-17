import { healthsystemPayerPlanPeriodCreate } from '@/types/healthsystemPayerPlanPeriodCreate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { useUpdateApiPayerPlanPeriodsId } from '@/services/useUpdateApiPayerPlanPeriodsId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdatePayerPlanPeriodsIdFormBody = {
  person_id: number
  payer_plan_period_start_date: string
  payer_plan_period_end_date: string
  payer_concept_id?: number | undefined
  payer_source_value?: string | undefined
  payer_source_concept_id?: number | undefined
  plan_concept_id?: number | undefined
  plan_source_value?: string | undefined
  plan_source_concept_id?: number | undefined
  sponsor_concept_id?: number | undefined
  sponsor_source_value?: string | undefined
  sponsor_source_concept_id?: number | undefined
  family_source_value?: string | undefined
  stop_reason_concept_id?: number | undefined
  stop_reason_source_value?: string | undefined
  stop_reason_source_concept_id?: number | undefined
}

export const UpdatePayerPlanPeriodsIdFormFields = () => {
  return (
    <>
      <IntegerField fieldName={`person_id`} />
      <StringField
        fieldName={`payer_plan_period_start_date`}
        label="payer_plan_period_start_date"
      />
      <StringField
        fieldName={`payer_plan_period_end_date`}
        label="payer_plan_period_end_date"
      />
      <IntegerField fieldName={`payer_concept_id`} />
      <StringField
        fieldName={`payer_source_value`}
        label="payer_source_value"
      />
      <IntegerField fieldName={`payer_source_concept_id`} />
      <IntegerField fieldName={`plan_concept_id`} />
      <StringField fieldName={`plan_source_value`} label="plan_source_value" />
      <IntegerField fieldName={`plan_source_concept_id`} />
      <IntegerField fieldName={`sponsor_concept_id`} />
      <StringField
        fieldName={`sponsor_source_value`}
        label="sponsor_source_value"
      />
      <IntegerField fieldName={`sponsor_source_concept_id`} />
      <StringField
        fieldName={`family_source_value`}
        label="family_source_value"
      />
      <IntegerField fieldName={`stop_reason_concept_id`} />
      <StringField
        fieldName={`stop_reason_source_value`}
        label="stop_reason_source_value"
      />
      <IntegerField fieldName={`stop_reason_source_concept_id`} />
    </>
  )
}

export type UpdatePayerPlanPeriodsIdFormProps = {
  id: number
  defaultValues: UpdatePayerPlanPeriodsIdFormBody
  onSuccess: () => void
}

export type UpdatePayerPlanPeriodsIdFormPathParams = { id: number }

export const UpdatePayerPlanPeriodsIdForm = (
  props: UpdatePayerPlanPeriodsIdFormProps,
) => {
  const form = useForm<UpdatePayerPlanPeriodsIdFormBody>({
    resolver: zodResolver(healthsystemPayerPlanPeriodCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiPayerPlanPeriodsId()

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
        <UpdatePayerPlanPeriodsIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
