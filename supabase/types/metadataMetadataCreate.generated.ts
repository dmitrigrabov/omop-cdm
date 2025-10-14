import { z } from 'zod'

export const metadataMetadataCreate = z.object({
  metadata_concept_id: z.number().int(),
  metadata_type_concept_id: z.number().int(),
  name: z.string(),
  value_as_string: z.string().optional(),
  value_as_concept_id: z.number().int().optional(),
  value_as_number: z.number().optional(),
  metadata_date: z.string().optional(),
  metadata_datetime: z.string().optional(),
})

export type MetadataMetadataCreate = {
  metadata_concept_id: number
  metadata_type_concept_id: number
  name: string
  value_as_string?: string | undefined
  value_as_concept_id?: number | undefined
  value_as_number?: number | undefined
  metadata_date?: string | undefined
  metadata_datetime?: string | undefined
}
