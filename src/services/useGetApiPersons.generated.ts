import { clinicalPersonList } from '@/types/clinicalPersonList.generated.ts'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

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
  sort_by?: 'id' | undefined
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

      return clinicalPersonList.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
