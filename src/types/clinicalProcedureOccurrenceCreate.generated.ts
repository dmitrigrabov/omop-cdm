import { z } from 'zod'

export const clinicalProcedureOccurrenceCreate = z.object({
  person_id: z.number().int(),
  procedure_concept_id: z.number().int(),
  procedure_date: z.string(),
  procedure_datetime: z.string().optional(),
  procedure_end_date: z.string().optional(),
  procedure_end_datetime: z.string().optional(),
  procedure_type_concept_id: z.number().int(),
  modifier_concept_id: z.number().int().optional(),
  quantity: z.number().int().optional(),
  provider_id: z.number().int().optional(),
  visit_occurrence_id: z.number().int().optional(),
  visit_detail_id: z.number().int().optional(),
  procedure_source_value: z.string().optional(),
  procedure_source_concept_id: z.number().int().optional(),
  modifier_source_value: z.string().optional(),
})

export type ClinicalProcedureOccurrenceCreate = {
  person_id: number
  procedure_concept_id: number
  procedure_date: string
  procedure_datetime?: string | undefined
  procedure_end_date?: string | undefined
  procedure_end_datetime?: string | undefined
  procedure_type_concept_id: number
  modifier_concept_id?: number | undefined
  quantity?: number | undefined
  provider_id?: number | undefined
  visit_occurrence_id?: number | undefined
  visit_detail_id?: number | undefined
  procedure_source_value?: string | undefined
  procedure_source_concept_id?: number | undefined
  modifier_source_value?: string | undefined
}
