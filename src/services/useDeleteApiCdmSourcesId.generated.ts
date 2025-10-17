import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiCdmSourcesIdArgs = { id: string }

export const useDeleteApiCdmSourcesIdResponse = z.void()

export type UseDeleteApiCdmSourcesIdResponse = void

export type DeleteApiCdmSourcesIdBody = void

export const useDeleteApiCdmSourcesId = (
  args: UseMutationOptions<
    UseDeleteApiCdmSourcesIdResponse,
    Error,
    UseDeleteApiCdmSourcesIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiCdmSourcesIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/cdm-sources/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiCdmSourcesIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Metadata - CdmSources'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
