import { derivedConditionEra } from '@/types/derivedConditionEra.generated.ts'
import { z } from 'zod'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export const useGetApiConditionErasResponse = z.object({
  data: z.array(derivedConditionEra),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type UseGetApiConditionErasArgs = {
  offset?: number | undefined
  limit?: number | undefined
  person_id?: number | undefined
  condition_concept_id?: CommonConceptId | undefined
  sort_by?: 'condition_era_id' | undefined
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

      return useGetApiConditionErasResponse.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
