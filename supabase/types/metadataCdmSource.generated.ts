import { z } from 'zod'

export type MetadataCdmSource = {
  cdm_source_name: string
  cdm_source_abbreviation: string
  cdm_holder: string
  source_description?: string | undefined
  source_documentation_reference?: string | undefined
  cdm_etl_reference?: string | undefined
  source_release_date: string
  cdm_release_date: string
  cdm_version?: string | undefined
  cdm_version_concept_id: number
  vocabulary_version: string
}

export const metadataCdmSource = z.object({
  cdm_source_name: z.string(),
  cdm_source_abbreviation: z.string(),
  cdm_holder: z.string(),
  source_description: z.string().optional(),
  source_documentation_reference: z.string().optional(),
  cdm_etl_reference: z.string().optional(),
  source_release_date: z.string(),
  cdm_release_date: z.string(),
  cdm_version: z.string().optional(),
  cdm_version_concept_id: z.number().int(),
  vocabulary_version: z.string(),
})
