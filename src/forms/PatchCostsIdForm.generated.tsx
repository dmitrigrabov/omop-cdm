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

export const PatchCostsIdFormFields = () => {
  return (
    <>
      <IntegerField fieldName={`cost_event_id`} />
      <StringField fieldName={`cost_domain_id`} label="cost_domain_id" />
      <IntegerField fieldName={`cost_type_concept_id`} />
      <IntegerField fieldName={`currency_concept_id`} />
      <NumberField fieldName={`total_charge`} />
      <NumberField fieldName={`total_cost`} />
      <NumberField fieldName={`total_paid`} />
      <NumberField fieldName={`paid_by_payer`} />
      <NumberField fieldName={`paid_by_patient`} />
      <NumberField fieldName={`paid_patient_copay`} />
      <NumberField fieldName={`paid_patient_coinsurance`} />
      <NumberField fieldName={`paid_patient_deductible`} />
      <NumberField fieldName={`paid_by_primary`} />
      <NumberField fieldName={`paid_ingredient_cost`} />
      <NumberField fieldName={`paid_dispensing_fee`} />
      <IntegerField fieldName={`payer_plan_period_id`} />
      <NumberField fieldName={`amount_allowed`} />
      <IntegerField fieldName={`revenue_code_concept_id`} />
      <StringField
        fieldName={`revenue_code_source_value`}
        label="revenue_code_source_value"
      />
      <IntegerField fieldName={`drg_concept_id`} />
      <StringField fieldName={`drg_source_value`} label="drg_source_value" />
    </>
  )
}

export type PatchCostsIdFormProps = {
  id: number
  defaultValues: PatchCostsIdFormBody
  onSuccess: () => void
}

export type PatchCostsIdFormPathParams = { id: number }

export const PatchCostsIdForm = (props: PatchCostsIdFormProps) => {
  const form = useForm<PatchCostsIdFormBody>({
    resolver: zodResolver(healthsystemCostUpdate),
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
        <PatchCostsIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
