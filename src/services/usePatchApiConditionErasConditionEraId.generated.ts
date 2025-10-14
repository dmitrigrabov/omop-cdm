import { DerivedConditionEraUpdate } from '@/types/derivedConditionEraUpdate.generated.ts'
import {
  derivedConditionEra,
  DerivedConditionEra,
} from '@/types/derivedConditionEra.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'
import { z } from 'zod'

export type UsePatchApiConditionErasConditionEraIdArgs = {
  condition_era_id: number
  body: DerivedConditionEraUpdate
}

export const usePatchApiConditionErasConditionEraId = (
  args: UseMutationOptions<
    DerivedConditionEra,
    Error,
    UsePatchApiConditionErasConditionEraIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      condition_era_id,
      body,
    }: UsePatchApiConditionErasConditionEraIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/condition-eras/${condition_era_id}`,
        {
          method: 'PATCH',
          body,
        },
      )

      if (error) {
        throw error
      }

      return derivedConditionEra.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Derived - ConditionEras'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
