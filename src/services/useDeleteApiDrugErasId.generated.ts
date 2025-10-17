import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiDrugErasIdArgs = { id: number }

export const useDeleteApiDrugErasIdResponse = z.void()

export type UseDeleteApiDrugErasIdResponse = void

export type DeleteApiDrugErasIdBody = void

export const useDeleteApiDrugErasId = (
  args: UseMutationOptions<
    UseDeleteApiDrugErasIdResponse,
    Error,
    UseDeleteApiDrugErasIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiDrugErasIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/drug-eras/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiDrugErasIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ['Derived - DrugEras'] })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
