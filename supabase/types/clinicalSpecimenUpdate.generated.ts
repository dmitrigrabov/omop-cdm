import { z } from 'zod'

export const clinicalSpecimenUpdate = z.object({
  person_id: z.number().int().optional(),
  specimen_concept_id: z.number().int().optional(),
  specimen_type_concept_id: z.number().int().optional(),
  specimen_date: z.string().optional(),
  specimen_datetime: z.string().optional(),
  quantity: z.number().optional(),
  unit_concept_id: z.number().int().optional(),
  anatomic_site_concept_id: z.number().int().optional(),
  disease_status_concept_id: z.number().int().optional(),
  specimen_source_id: z.string().optional(),
  specimen_source_value: z.string().optional(),
  unit_source_value: z.string().optional(),
  anatomic_site_source_value: z.string().optional(),
  disease_status_source_value: z.string().optional(),
})

export type ClinicalSpecimenUpdate = {
  person_id?: number | undefined
  specimen_concept_id?: number | undefined
  specimen_type_concept_id?: number | undefined
  specimen_date?: string | undefined
  specimen_datetime?: string | undefined
  quantity?: number | undefined
  unit_concept_id?: number | undefined
  anatomic_site_concept_id?: number | undefined
  disease_status_concept_id?: number | undefined
  specimen_source_id?: string | undefined
  specimen_source_value?: string | undefined
  unit_source_value?: string | undefined
  anatomic_site_source_value?: string | undefined
  disease_status_source_value?: string | undefined
}
