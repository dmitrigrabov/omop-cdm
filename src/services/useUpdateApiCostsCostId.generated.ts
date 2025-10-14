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

export type UseUpdateApiCostsCostIdArgs = {
  cost_id: number
  body: HealthsystemCostCreate
}

export const useUpdateApiCostsCostId = (
  args: UseMutationOptions<
    HealthsystemCost,
    Error,
    UseUpdateApiCostsCostIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ cost_id, body }: UseUpdateApiCostsCostIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/costs/${cost_id}`,
        {
          method: 'PUT',
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
