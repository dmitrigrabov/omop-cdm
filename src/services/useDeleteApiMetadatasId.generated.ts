import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiMetadatasIdArgs = { id: string }

export const useDeleteApiMetadatasIdResponse = z.void()

export type UseDeleteApiMetadatasIdResponse = void

export type DeleteApiMetadatasIdBody = void

export const useDeleteApiMetadatasId = (
  args: UseMutationOptions<
    UseDeleteApiMetadatasIdResponse,
    Error,
    UseDeleteApiMetadatasIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiMetadatasIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/metadatas/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiMetadatasIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ['Metadata - Metadatas'] })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
