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

export type UseCreateApiFactRelationshipsArgs = {
  body: ResultsFactRelationshipCreate
}

export const useCreateApiFactRelationships = (
  args: UseMutationOptions<
    ResultsFactRelationship,
    Error,
    UseCreateApiFactRelationshipsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ body }: UseCreateApiFactRelationshipsArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/fact-relationships`,
        {
          method: 'POST',
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
