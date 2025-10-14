import { z } from 'zod'

export const clinicalSpecimenCreate = z.object({
  person_id: z.number().int(),
  specimen_concept_id: z.number().int(),
  specimen_type_concept_id: z.number().int(),
  specimen_date: z.string(),
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

export type ClinicalSpecimenCreate = {
  person_id: number
  specimen_concept_id: number
  specimen_type_concept_id: number
  specimen_date: string
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
