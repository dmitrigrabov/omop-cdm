import { healthsystemCostUpdate } from '@/types/healthsystemCostUpdate.generated.ts'
import { usePatchApiCostsCostId } from '@/services/usePatchApiCostsCostId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchCostsCostIdFormBody = {
  cost_event_id?: number | undefined
  cost_domain_id?: string | undefined
  cost_type_concept_id?: number | undefined
  currency_concept_id?: number | undefined
  total_charge?: number | undefined
  total_cost?: number | undefined
  total_paid?: number | undefined
  paid_by_payer?: number | undefined
  paid_by_patient?: number | undefined
  paid_patient_copay?: number | undefined
  paid_patient_coinsurance?: number | undefined
  paid_patient_deductible?: number | undefined
  paid_by_primary?: number | undefined
  paid_ingredient_cost?: number | undefined
  paid_dispensing_fee?: number | undefined
  payer_plan_period_id?: number | undefined
  amount_allowed?: number | undefined
  revenue_code_concept_id?: number | undefined
  revenue_code_source_value?: string | undefined
  drg_concept_id?: number | undefined
  drg_source_value?: string | undefined
}

export type PatchCostsCostIdFormProps = {
  cost_id: number
  defaultValues: PatchCostsCostIdFormBody
  onSuccess: () => void
}

export type PatchCostsCostIdFormPathParams = { cost_id: number }

export const PatchCostsCostIdForm = (props: PatchCostsCostIdFormProps) => {
  const form = useForm<PatchCostsCostIdFormBody>({
    resolver: zodResolver(healthsystemCostUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiCostsCostId()

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
