import { z } from 'zod'

export const healthsystemCostUpdate = z.object({
  cost_event_id: z.number().int().optional(),
  cost_domain_id: z.string().optional(),
  cost_type_concept_id: z.number().int().optional(),
  currency_concept_id: z.number().int().optional(),
  total_charge: z.number().optional(),
  total_cost: z.number().optional(),
  total_paid: z.number().optional(),
  paid_by_payer: z.number().optional(),
  paid_by_patient: z.number().optional(),
  paid_patient_copay: z.number().optional(),
  paid_patient_coinsurance: z.number().optional(),
  paid_patient_deductible: z.number().optional(),
  paid_by_primary: z.number().optional(),
  paid_ingredient_cost: z.number().optional(),
  paid_dispensing_fee: z.number().optional(),
  payer_plan_period_id: z.number().int().optional(),
  amount_allowed: z.number().optional(),
  revenue_code_concept_id: z.number().int().optional(),
  revenue_code_source_value: z.string().optional(),
  drg_concept_id: z.number().int().optional(),
  drg_source_value: z.string().optional(),
})

export type HealthsystemCostUpdate = {
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
