import { clinicalDeathList } from '@/types/clinicalDeathList.generated.ts'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export type UseGetApiDeathsArgs = {
  offset?: number | undefined
  limit?: number | undefined
  person_id?: number | undefined
  death_type_concept_id?: CommonConceptId | undefined
  cause_concept_id?: CommonConceptId | undefined
  cause_source_concept_id?: CommonConceptId | undefined
  sort_by?: 'id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiDeaths = ({
  offset,
  limit,
  person_id,
  death_type_concept_id,
  cause_concept_id,
  cause_source_concept_id,
  sort_by,
  sort_order,
}: UseGetApiDeathsArgs) => {
  const result = useQuery({
    queryKey: [
      'Clinical - Deaths',
      offset,
      limit,
      person_id,
      death_type_concept_id,
      cause_concept_id,
      cause_source_concept_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(`/deaths`, {
        method: 'GET',
      })

      if (error) {
        throw error
      }

      return clinicalDeathList.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
