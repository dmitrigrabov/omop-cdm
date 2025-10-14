import { z } from 'zod'

export const metadataMetadataUpdate = z.object({
  metadata_concept_id: z.number().int().optional(),
  metadata_type_concept_id: z.number().int().optional(),
  name: z.string().optional(),
  value_as_string: z.string().optional(),
  value_as_concept_id: z.number().int().optional(),
  value_as_number: z.number().optional(),
  metadata_date: z.string().optional(),
  metadata_datetime: z.string().optional(),
})

export type MetadataMetadataUpdate = {
  metadata_concept_id?: number | undefined
  metadata_type_concept_id?: number | undefined
  name?: string | undefined
  value_as_string?: string | undefined
  value_as_concept_id?: number | undefined
  value_as_number?: number | undefined
  metadata_date?: string | undefined
  metadata_datetime?: string | undefined
}
