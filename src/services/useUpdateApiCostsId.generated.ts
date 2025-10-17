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
import { z } from 'zod'

export type UseUpdateApiCostsIdArgs = {
  id: number
  body: HealthsystemCostCreate
}

export const useUpdateApiCostsId = (
  args: UseMutationOptions<
    HealthsystemCost,
    Error,
    UseUpdateApiCostsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UseUpdateApiCostsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(`/costs/${id}`, {
        method: 'PUT',
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
