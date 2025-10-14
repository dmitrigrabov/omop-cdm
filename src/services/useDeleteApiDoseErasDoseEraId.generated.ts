import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiDoseErasDoseEraIdArgs = { dose_era_id: number }

export const useDeleteApiDoseErasDoseEraIdResponse = z.void()

export type UseDeleteApiDoseErasDoseEraIdResponse = void

export type DeleteApiDoseErasDoseEraIdBody = void

export const useDeleteApiDoseErasDoseEraId = (
  args: UseMutationOptions<
    UseDeleteApiDoseErasDoseEraIdResponse,
    Error,
    UseDeleteApiDoseErasDoseEraIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ dose_era_id }: UseDeleteApiDoseErasDoseEraIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/dose-eras/${dose_era_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiDoseErasDoseEraIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ['Derived - DoseEras'] })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
