import { clinicalVisitDetail } from '@/types/clinicalVisitDetail.generated.ts'
import { z } from 'zod'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export const useGetApiVisitDetailsResponse = z.object({
  data: z.array(clinicalVisitDetail),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type UseGetApiVisitDetailsArgs = {
  offset?: number | undefined
  limit?: number | undefined
  person_id?: number | undefined
  visit_detail_concept_id?: CommonConceptId | undefined
  visit_detail_type_concept_id?: CommonConceptId | undefined
  provider_id?: number | undefined
  care_site_id?: number | undefined
  visit_detail_source_concept_id?: CommonConceptId | undefined
  admitted_from_concept_id?: CommonConceptId | undefined
  discharged_to_concept_id?: CommonConceptId | undefined
  preceding_visit_detail_id?: number | undefined
  parent_visit_detail_id?: number | undefined
  visit_occurrence_id?: number | undefined
  sort_by?: 'id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiVisitDetails = ({
  offset,
  limit,
  person_id,
  visit_detail_concept_id,
  visit_detail_type_concept_id,
  provider_id,
  care_site_id,
  visit_detail_source_concept_id,
  admitted_from_concept_id,
  discharged_to_concept_id,
  preceding_visit_detail_id,
  parent_visit_detail_id,
  visit_occurrence_id,
  sort_by,
  sort_order,
}: UseGetApiVisitDetailsArgs) => {
  const result = useQuery({
    queryKey: [
      'Clinical - VisitDetails',
      offset,
      limit,
      person_id,
      visit_detail_concept_id,
      visit_detail_type_concept_id,
      provider_id,
      care_site_id,
      visit_detail_source_concept_id,
      admitted_from_concept_id,
      discharged_to_concept_id,
      preceding_visit_detail_id,
      parent_visit_detail_id,
      visit_occurrence_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/visit-details`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return useGetApiVisitDetailsResponse.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
