import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiDoseErasIdArgs = { id: number }

export const useDeleteApiDoseErasIdResponse = z.void()

export type UseDeleteApiDoseErasIdResponse = void

export type DeleteApiDoseErasIdBody = void

export const useDeleteApiDoseErasId = (
  args: UseMutationOptions<
    UseDeleteApiDoseErasIdResponse,
    Error,
    UseDeleteApiDoseErasIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiDoseErasIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/dose-eras/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiDoseErasIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ['Derived - DoseEras'] })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
