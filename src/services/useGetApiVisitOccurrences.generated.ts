import { clinicalVisitOccurrence } from '@/types/clinicalVisitOccurrence.generated.ts'
import { z } from 'zod'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export const useGetApiVisitOccurrencesResponse = z.object({
  data: z.array(clinicalVisitOccurrence),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type UseGetApiVisitOccurrencesArgs = {
  offset?: number | undefined
  limit?: number | undefined
  person_id?: number | undefined
  visit_concept_id?: CommonConceptId | undefined
  visit_type_concept_id?: CommonConceptId | undefined
  provider_id?: number | undefined
  care_site_id?: number | undefined
  visit_source_concept_id?: CommonConceptId | undefined
  admitted_from_concept_id?: CommonConceptId | undefined
  discharged_to_concept_id?: CommonConceptId | undefined
  preceding_visit_occurrence_id?: number | undefined
  sort_by?: 'visit_occurrence_id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiVisitOccurrences = ({
  offset,
  limit,
  person_id,
  visit_concept_id,
  visit_type_concept_id,
  provider_id,
  care_site_id,
  visit_source_concept_id,
  admitted_from_concept_id,
  discharged_to_concept_id,
  preceding_visit_occurrence_id,
  sort_by,
  sort_order,
}: UseGetApiVisitOccurrencesArgs) => {
  const result = useQuery({
    queryKey: [
      'Clinical - VisitOccurrences',
      offset,
      limit,
      person_id,
      visit_concept_id,
      visit_type_concept_id,
      provider_id,
      care_site_id,
      visit_source_concept_id,
      admitted_from_concept_id,
      discharged_to_concept_id,
      preceding_visit_occurrence_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/visit-occurrences`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return useGetApiVisitOccurrencesResponse.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
