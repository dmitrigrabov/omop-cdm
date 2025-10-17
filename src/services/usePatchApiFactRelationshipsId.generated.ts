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

export type UsePatchApiFactRelationshipsIdArgs = {
  id: string
  body: ResultsFactRelationshipUpdate
}

export const usePatchApiFactRelationshipsId = (
  args: UseMutationOptions<
    ResultsFactRelationship,
    Error,
    UsePatchApiFactRelationshipsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiFactRelationshipsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/fact-relationships/${id}`,
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
