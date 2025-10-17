import { healthsystemCostUpdate } from '@/types/healthsystemCostUpdate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { NumberField } from '@/components/fields/number-field'
import { usePatchApiCostsId } from '@/services/usePatchApiCostsId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchCostsIdFormBody = {
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

export type PatchCostsIdFormProps = {
  id: string
  defaultValues: Required<PatchCostsIdFormBody>
  onSuccess: () => void
}

export type PatchCostsIdFormPathParams = { id: string }

export const PatchCostsIdForm = (props: PatchCostsIdFormProps) => {
  const form = useForm<Required<PatchCostsIdFormBody>>({
    resolver: zodResolver(healthsystemCostUpdate.required()),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiCostsId()

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
        <IntegerField
          lens={lens.focus('cost_event_id')}
          label="cost_event_id"
        />
        <StringField
          lens={lens.focus('cost_domain_id')}
          label="cost_domain_id"
        />
        <IntegerField
          lens={lens.focus('cost_type_concept_id')}
          label="cost_type_concept_id"
        />
        <IntegerField
          lens={lens.focus('currency_concept_id')}
          label="currency_concept_id"
        />
        <NumberField lens={lens.focus('total_charge')} />
        <NumberField lens={lens.focus('total_cost')} />
        <NumberField lens={lens.focus('total_paid')} />
        <NumberField lens={lens.focus('paid_by_payer')} />
        <NumberField lens={lens.focus('paid_by_patient')} />
        <NumberField lens={lens.focus('paid_patient_copay')} />
        <NumberField lens={lens.focus('paid_patient_coinsurance')} />
        <NumberField lens={lens.focus('paid_patient_deductible')} />
        <NumberField lens={lens.focus('paid_by_primary')} />
        <NumberField lens={lens.focus('paid_ingredient_cost')} />
        <NumberField lens={lens.focus('paid_dispensing_fee')} />
        <IntegerField
          lens={lens.focus('payer_plan_period_id')}
          label="payer_plan_period_id"
        />
        <NumberField lens={lens.focus('amount_allowed')} />
        <IntegerField
          lens={lens.focus('revenue_code_concept_id')}
          label="revenue_code_concept_id"
        />
        <StringField
          lens={lens.focus('revenue_code_source_value')}
          label="revenue_code_source_value"
        />
        <IntegerField
          lens={lens.focus('drg_concept_id')}
          label="drg_concept_id"
        />
        <StringField
          lens={lens.focus('drg_source_value')}
          label="drg_source_value"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
