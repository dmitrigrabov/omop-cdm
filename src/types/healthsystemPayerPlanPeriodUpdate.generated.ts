import { z } from 'zod'

export const healthsystemPayerPlanPeriodUpdate = z.object({
  person_id: z.number().int().optional(),
  payer_plan_period_start_date: z.string().optional(),
  payer_plan_period_end_date: z.string().optional(),
  payer_concept_id: z.number().int().optional(),
  payer_source_value: z.string().optional(),
  payer_source_concept_id: z.number().int().optional(),
  plan_concept_id: z.number().int().optional(),
  plan_source_value: z.string().optional(),
  plan_source_concept_id: z.number().int().optional(),
  sponsor_concept_id: z.number().int().optional(),
  sponsor_source_value: z.string().optional(),
  sponsor_source_concept_id: z.number().int().optional(),
  family_source_value: z.string().optional(),
  stop_reason_concept_id: z.number().int().optional(),
  stop_reason_source_value: z.string().optional(),
  stop_reason_source_concept_id: z.number().int().optional(),
})

export type HealthsystemPayerPlanPeriodUpdate = {
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
