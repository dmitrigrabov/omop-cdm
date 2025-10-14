import { ResultsFactRelationshipCreate } from '@/types/resultsFactRelationshipCreate.generated.ts'
import {
  resultsFactRelationship,
  ResultsFactRelationship,
} from '@/types/resultsFactRelationship.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'
import { z } from 'zod'

export type UseUpdateApiFactRelationshipsFactRelationshipIdArgs = {
  fact_relationship_id: number
  body: ResultsFactRelationshipCreate
}

export const useUpdateApiFactRelationshipsFactRelationshipId = (
  args: UseMutationOptions<
    ResultsFactRelationship,
    Error,
    UseUpdateApiFactRelationshipsFactRelationshipIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      fact_relationship_id,
      body,
    }: UseUpdateApiFactRelationshipsFactRelationshipIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/fact-relationships/${fact_relationship_id}`,
        {
          method: 'PUT',
          body,
        },
      )

      if (error) {
        throw error
      }

      return resultsFactRelationship.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Results - FactRelationships'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
