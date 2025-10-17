import { HealthsystemCostCreate } from '@/types/healthsystemCostCreate.generated.ts'
import {
  healthsystemCost,
  HealthsystemCost,
} from '@/types/healthsystemCost.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseCreateApiCostsArgs = { body: HealthsystemCostCreate }

export const useCreateApiCosts = (
  args: UseMutationOptions<
    HealthsystemCost,
    Error,
    UseCreateApiCostsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ body }: UseCreateApiCostsArgs) => {
      const { data, error } = await supabase.functions.invoke(`/costs`, {
        method: 'POST',
        body,
      })

      if (error) {
        throw error
      }

      return healthsystemCost.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Health System - Costs'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
