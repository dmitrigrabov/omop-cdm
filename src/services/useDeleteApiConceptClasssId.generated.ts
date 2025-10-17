import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiConceptClasssIdArgs = { id: string }

export const useDeleteApiConceptClasssIdResponse = z.void()

export type UseDeleteApiConceptClasssIdResponse = void

export type DeleteApiConceptClasssIdBody = void

export const useDeleteApiConceptClasssId = (
  args: UseMutationOptions<
    UseDeleteApiConceptClasssIdResponse,
    Error,
    UseDeleteApiConceptClasssIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiConceptClasssIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-classs/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiConceptClasssIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Vocabulary - ConceptClasss'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
