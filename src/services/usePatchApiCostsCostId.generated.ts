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
import { z } from 'zod'

export type UsePatchApiCostsCostIdArgs = {
  cost_id: number
  body: HealthsystemCostUpdate
}

export const usePatchApiCostsCostId = (
  args: UseMutationOptions<
    HealthsystemCost,
    Error,
    UsePatchApiCostsCostIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ cost_id, body }: UsePatchApiCostsCostIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/costs/${cost_id}`,
        {
          method: 'PATCH',
          body,
        },
      )

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
