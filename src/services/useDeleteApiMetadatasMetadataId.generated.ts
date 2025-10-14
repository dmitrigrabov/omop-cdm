import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiMetadatasMetadataIdArgs = { metadata_id: number }

export const useDeleteApiMetadatasMetadataIdResponse = z.void()

export type UseDeleteApiMetadatasMetadataIdResponse = void

export type DeleteApiMetadatasMetadataIdBody = void

export const useDeleteApiMetadatasMetadataId = (
  args: UseMutationOptions<
    UseDeleteApiMetadatasMetadataIdResponse,
    Error,
    UseDeleteApiMetadatasMetadataIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      metadata_id,
    }: UseDeleteApiMetadatasMetadataIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/metadatas/${metadata_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiMetadatasMetadataIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ['Metadata - Metadatas'] })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
