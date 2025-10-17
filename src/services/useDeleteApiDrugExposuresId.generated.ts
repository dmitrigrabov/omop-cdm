import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiDrugExposuresIdArgs = { id: number }

export const useDeleteApiDrugExposuresIdResponse = z.void()

export type UseDeleteApiDrugExposuresIdResponse = void

export type DeleteApiDrugExposuresIdBody = void

export const useDeleteApiDrugExposuresId = (
  args: UseMutationOptions<
    UseDeleteApiDrugExposuresIdResponse,
    Error,
    UseDeleteApiDrugExposuresIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiDrugExposuresIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/drug-exposures/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiDrugExposuresIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Clinical - DrugExposures'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
