import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiDrugStrengthsDrugStrengthIdArgs = {
  drug_strength_id: number
}

export const useDeleteApiDrugStrengthsDrugStrengthIdResponse = z.void()

export type UseDeleteApiDrugStrengthsDrugStrengthIdResponse = void

export type DeleteApiDrugStrengthsDrugStrengthIdBody = void

export const useDeleteApiDrugStrengthsDrugStrengthId = (
  args: UseMutationOptions<
    UseDeleteApiDrugStrengthsDrugStrengthIdResponse,
    Error,
    UseDeleteApiDrugStrengthsDrugStrengthIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      drug_strength_id,
    }: UseDeleteApiDrugStrengthsDrugStrengthIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/drug-strengths/${drug_strength_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiDrugStrengthsDrugStrengthIdResponse.parse(data)
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
