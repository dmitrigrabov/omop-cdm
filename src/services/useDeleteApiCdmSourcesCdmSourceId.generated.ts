import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiCdmSourcesCdmSourceIdArgs = { cdm_source_id: number }

export const useDeleteApiCdmSourcesCdmSourceIdResponse = z.void()

export type UseDeleteApiCdmSourcesCdmSourceIdResponse = void

export type DeleteApiCdmSourcesCdmSourceIdBody = void

export const useDeleteApiCdmSourcesCdmSourceId = (
  args: UseMutationOptions<
    UseDeleteApiCdmSourcesCdmSourceIdResponse,
    Error,
    UseDeleteApiCdmSourcesCdmSourceIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      cdm_source_id,
    }: UseDeleteApiCdmSourcesCdmSourceIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/cdm-sources/${cdm_source_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiCdmSourcesCdmSourceIdResponse.parse(data)
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
