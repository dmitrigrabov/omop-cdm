import { derivedConditionEraList } from '@/types/derivedConditionEraList.generated.ts'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export type UseGetApiConditionErasArgs = {
  offset?: number | undefined
  limit?: number | undefined
  person_id?: number | undefined
  condition_concept_id?: CommonConceptId | undefined
  sort_by?: 'id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiConditionEras = ({
  offset,
  limit,
  person_id,
  condition_concept_id,
  sort_by,
  sort_order,
}: UseGetApiConditionErasArgs) => {
  const result = useQuery({
    queryKey: [
      'Derived - ConditionEras',
      offset,
      limit,
      person_id,
      condition_concept_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/condition-eras`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return derivedConditionEraList.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
