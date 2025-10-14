import { ResultsFactRelationshipUpdate } from '@/types/resultsFactRelationshipUpdate.generated.ts'
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

export type UsePatchApiFactRelationshipsFactRelationshipIdArgs = {
  fact_relationship_id: number
  body: ResultsFactRelationshipUpdate
}

export const usePatchApiFactRelationshipsFactRelationshipId = (
  args: UseMutationOptions<
    ResultsFactRelationship,
    Error,
    UsePatchApiFactRelationshipsFactRelationshipIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      fact_relationship_id,
      body,
    }: UsePatchApiFactRelationshipsFactRelationshipIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/fact-relationships/${fact_relationship_id}`,
        {
          method: 'PATCH',
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
