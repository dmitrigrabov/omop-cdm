import { resultsCohortDefinition } from '@/types/resultsCohortDefinition.generated.ts'
import { z } from 'zod'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export const useGetApiCohortDefinitionsResponse = z.object({
  data: z.array(resultsCohortDefinition),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type UseGetApiCohortDefinitionsArgs = {
  offset?: number | undefined
  limit?: number | undefined
  definition_type_concept_id?: CommonConceptId | undefined
  subject_concept_id?: CommonConceptId | undefined
  sort_by?: 'id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiCohortDefinitions = ({
  offset,
  limit,
  definition_type_concept_id,
  subject_concept_id,
  sort_by,
  sort_order,
}: UseGetApiCohortDefinitionsArgs) => {
  const result = useQuery({
    queryKey: [
      'Results - CohortDefinitions',
      offset,
      limit,
      definition_type_concept_id,
      subject_concept_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/cohort-definitions`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return useGetApiCohortDefinitionsResponse.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
