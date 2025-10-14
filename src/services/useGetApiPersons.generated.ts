import { clinicalPerson } from '@/types/clinicalPerson.generated.ts'
import { z } from 'zod'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export const useGetApiPersonsResponse = z.object({
  data: z.array(clinicalPerson),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type UseGetApiPersonsArgs = {
  offset?: number | undefined
  limit?: number | undefined
  gender_concept_id?: CommonConceptId | undefined
  race_concept_id?: CommonConceptId | undefined
  ethnicity_concept_id?: CommonConceptId | undefined
  location_id?: number | undefined
  provider_id?: number | undefined
  care_site_id?: number | undefined
  gender_source_concept_id?: CommonConceptId | undefined
  race_source_concept_id?: CommonConceptId | undefined
  ethnicity_source_concept_id?: CommonConceptId | undefined
  sort_by?: 'person_id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiPersons = ({
  offset,
  limit,
  gender_concept_id,
  race_concept_id,
  ethnicity_concept_id,
  location_id,
  provider_id,
  care_site_id,
  gender_source_concept_id,
  race_source_concept_id,
  ethnicity_source_concept_id,
  sort_by,
  sort_order,
}: UseGetApiPersonsArgs) => {
  const result = useQuery({
    queryKey: [
      'Clinical - Persons',
      offset,
      limit,
      gender_concept_id,
      race_concept_id,
      ethnicity_concept_id,
      location_id,
      provider_id,
      care_site_id,
      gender_source_concept_id,
      race_source_concept_id,
      ethnicity_source_concept_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(`/persons`, {
        method: 'GET',
      })

      if (error) {
        throw error
      }

      return useGetApiPersonsResponse.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
