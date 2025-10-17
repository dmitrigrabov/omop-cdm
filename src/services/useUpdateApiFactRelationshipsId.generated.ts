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

export type UseUpdateApiFactRelationshipsIdArgs = {
  id: number
  body: ResultsFactRelationshipCreate
}

export const useUpdateApiFactRelationshipsId = (
  args: UseMutationOptions<
    ResultsFactRelationship,
    Error,
    UseUpdateApiFactRelationshipsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UseUpdateApiFactRelationshipsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/fact-relationships/${id}`,
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
