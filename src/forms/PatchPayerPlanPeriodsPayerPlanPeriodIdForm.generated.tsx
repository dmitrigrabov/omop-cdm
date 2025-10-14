import { healthsystemPayerPlanPeriodUpdate } from '@/types/healthsystemPayerPlanPeriodUpdate.generated.ts'
import { usePatchApiPayerPlanPeriodsPayerPlanPeriodId } from '@/services/usePatchApiPayerPlanPeriodsPayerPlanPeriodId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchPayerPlanPeriodsPayerPlanPeriodIdFormBody = {
  person_id?: number | undefined
  payer_plan_period_start_date?: string | undefined
  payer_plan_period_end_date?: string | undefined
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

export type PatchPayerPlanPeriodsPayerPlanPeriodIdFormProps = {
  payer_plan_period_id: number
  defaultValues: PatchPayerPlanPeriodsPayerPlanPeriodIdFormBody
  onSuccess: () => void
}

export type PatchPayerPlanPeriodsPayerPlanPeriodIdFormPathParams = {
  payer_plan_period_id: number
}

export const PatchPayerPlanPeriodsPayerPlanPeriodIdForm = (
  props: PatchPayerPlanPeriodsPayerPlanPeriodIdFormProps,
) => {
  const form = useForm<PatchPayerPlanPeriodsPayerPlanPeriodIdFormBody>({
    resolver: zodResolver(healthsystemPayerPlanPeriodUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiPayerPlanPeriodsPayerPlanPeriodId()

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
