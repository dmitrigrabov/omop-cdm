import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiDrugStrengthsIdArgs = { id: number }

export const useDeleteApiDrugStrengthsIdResponse = z.void()

export type UseDeleteApiDrugStrengthsIdResponse = void

export type DeleteApiDrugStrengthsIdBody = void

export const useDeleteApiDrugStrengthsId = (
  args: UseMutationOptions<
    UseDeleteApiDrugStrengthsIdResponse,
    Error,
    UseDeleteApiDrugStrengthsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiDrugStrengthsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/drug-strengths/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiDrugStrengthsIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Vocabulary - DrugStrengths'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
