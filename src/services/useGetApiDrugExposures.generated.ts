import { clinicalDrugExposure } from '@/types/clinicalDrugExposure.generated.ts'
import { z } from 'zod'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export const useGetApiDrugExposuresResponse = z.object({
  data: z.array(clinicalDrugExposure),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type UseGetApiDrugExposuresArgs = {
  offset?: number | undefined
  limit?: number | undefined
  person_id?: number | undefined
  drug_concept_id?: CommonConceptId | undefined
  drug_type_concept_id?: CommonConceptId | undefined
  route_concept_id?: CommonConceptId | undefined
  provider_id?: number | undefined
  visit_occurrence_id?: number | undefined
  visit_detail_id?: number | undefined
  drug_source_concept_id?: CommonConceptId | undefined
  sort_by?: 'id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiDrugExposures = ({
  offset,
  limit,
  person_id,
  drug_concept_id,
  drug_type_concept_id,
  route_concept_id,
  provider_id,
  visit_occurrence_id,
  visit_detail_id,
  drug_source_concept_id,
  sort_by,
  sort_order,
}: UseGetApiDrugExposuresArgs) => {
  const result = useQuery({
    queryKey: [
      'Clinical - DrugExposures',
      offset,
      limit,
      person_id,
      drug_concept_id,
      drug_type_concept_id,
      route_concept_id,
      provider_id,
      visit_occurrence_id,
      visit_detail_id,
      drug_source_concept_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/drug-exposures`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return useGetApiDrugExposuresResponse.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
