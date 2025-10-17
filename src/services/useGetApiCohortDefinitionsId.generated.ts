import { resultsCohortDefinition } from '@/types/resultsCohortDefinition.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiCohortDefinitionsIdArgs = { id: string }

export const useGetApiCohortDefinitionsId = ({
  id,
}: UseGetApiCohortDefinitionsIdArgs) => {
  const result = useQuery({
    queryKey: ['Results - CohortDefinitions', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/cohort-definitions/${id}`,
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
