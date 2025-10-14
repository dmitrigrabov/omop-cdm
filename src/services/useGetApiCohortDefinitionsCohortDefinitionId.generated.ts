import { resultsCohortDefinition } from '@/types/resultsCohortDefinition.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiCohortDefinitionsCohortDefinitionIdArgs = {
  cohort_definition_id: number
}

export const useGetApiCohortDefinitionsCohortDefinitionId = ({
  cohort_definition_id,
}: UseGetApiCohortDefinitionsCohortDefinitionIdArgs) => {
  const result = useQuery({
    queryKey: ['Results - CohortDefinitions', cohort_definition_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/cohort-definitions/${cohort_definition_id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return resultsCohortDefinition.parse(data)
    },
  })

  return result
}
