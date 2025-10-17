import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiConceptsIdArgs = { id: number }

export const useDeleteApiConceptsIdResponse = z.void()

export type UseDeleteApiConceptsIdResponse = void

export type DeleteApiConceptsIdBody = void

export const useDeleteApiConceptsId = (
  args: UseMutationOptions<
    UseDeleteApiConceptsIdResponse,
    Error,
    UseDeleteApiConceptsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiConceptsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/concepts/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiConceptsIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Vocabulary - Concepts'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
