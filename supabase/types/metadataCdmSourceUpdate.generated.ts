import { z } from 'zod'

export const metadataCdmSourceUpdate = z.object({
  cdm_source_name: z.string().optional(),
  cdm_source_abbreviation: z.string().optional(),
  cdm_holder: z.string().optional(),
  source_description: z.string().optional(),
  source_documentation_reference: z.string().optional(),
  cdm_etl_reference: z.string().optional(),
  source_release_date: z.string().optional(),
  cdm_release_date: z.string().optional(),
  cdm_version: z.string().optional(),
  cdm_version_concept_id: z.number().int().optional(),
  vocabulary_version: z.string().optional(),
})

export type MetadataCdmSourceUpdate = {
  cdm_source_name?: string | undefined
  cdm_source_abbreviation?: string | undefined
  cdm_holder?: string | undefined
  source_description?: string | undefined
  source_documentation_reference?: string | undefined
  cdm_etl_reference?: string | undefined
  source_release_date?: string | undefined
  cdm_release_date?: string | undefined
  cdm_version?: string | undefined
  cdm_version_concept_id?: number | undefined
  vocabulary_version?: string | undefined
}
