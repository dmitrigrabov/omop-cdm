import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiSourceToConceptMapsIdArgs = { id: number }

export const useDeleteApiSourceToConceptMapsIdResponse = z.void()

export type UseDeleteApiSourceToConceptMapsIdResponse = void

export type DeleteApiSourceToConceptMapsIdBody = void

export const useDeleteApiSourceToConceptMapsId = (
  args: UseMutationOptions<
    UseDeleteApiSourceToConceptMapsIdResponse,
    Error,
    UseDeleteApiSourceToConceptMapsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiSourceToConceptMapsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/source-to-concept-maps/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiSourceToConceptMapsIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Vocabulary - SourceToConceptMaps'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
