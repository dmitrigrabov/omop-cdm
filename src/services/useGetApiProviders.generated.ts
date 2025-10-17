import { healthsystemProviderList } from '@/types/healthsystemProviderList.generated.ts'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export type UseGetApiProvidersArgs = {
  offset?: number | undefined
  limit?: number | undefined
  specialty_concept_id?: CommonConceptId | undefined
  care_site_id?: number | undefined
  gender_concept_id?: CommonConceptId | undefined
  specialty_source_concept_id?: CommonConceptId | undefined
  gender_source_concept_id?: CommonConceptId | undefined
  sort_by?: 'id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiProviders = ({
  offset,
  limit,
  specialty_concept_id,
  care_site_id,
  gender_concept_id,
  specialty_source_concept_id,
  gender_source_concept_id,
  sort_by,
  sort_order,
}: UseGetApiProvidersArgs) => {
  const result = useQuery({
    queryKey: [
      'Health System - Providers',
      offset,
      limit,
      specialty_concept_id,
      care_site_id,
      gender_concept_id,
      specialty_source_concept_id,
      gender_source_concept_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(`/providers`, {
        method: 'GET',
      })

      if (error) {
        throw error
      }

      return healthsystemProviderList.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
