import { z } from 'zod'

export const healthsystemPayerPlanPeriod = z.object({
  id: z.number().int(),
  person_id: z.number().int(),
  payer_plan_period_start_date: z.string(),
  payer_plan_period_end_date: z.string(),
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

export type HealthsystemPayerPlanPeriod = {
  id: number
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
