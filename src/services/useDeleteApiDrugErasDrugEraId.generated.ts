import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiDrugErasDrugEraIdArgs = { drug_era_id: number }

export const useDeleteApiDrugErasDrugEraIdResponse = z.void()

export type UseDeleteApiDrugErasDrugEraIdResponse = void

export type DeleteApiDrugErasDrugEraIdBody = void

export const useDeleteApiDrugErasDrugEraId = (
  args: UseMutationOptions<
    UseDeleteApiDrugErasDrugEraIdResponse,
    Error,
    UseDeleteApiDrugErasDrugEraIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ drug_era_id }: UseDeleteApiDrugErasDrugEraIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/drug-eras/${drug_era_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiDrugErasDrugEraIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ['Derived - DrugEras'] })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
