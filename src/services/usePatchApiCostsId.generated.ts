import { HealthsystemCostUpdate } from '@/types/healthsystemCostUpdate.generated.ts'
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

export type UsePatchApiCostsIdArgs = {
  id: string
  body: HealthsystemCostUpdate
}

export const usePatchApiCostsId = (
  args: UseMutationOptions<
    HealthsystemCost,
    Error,
    UsePatchApiCostsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiCostsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(`/costs/${id}`, {
        method: 'PATCH',
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
