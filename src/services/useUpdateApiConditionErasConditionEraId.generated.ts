import { DerivedConditionEraCreate } from '@/types/derivedConditionEraCreate.generated.ts'
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

export type UseUpdateApiConditionErasConditionEraIdArgs = {
  condition_era_id: number
  body: DerivedConditionEraCreate
}

export const useUpdateApiConditionErasConditionEraId = (
  args: UseMutationOptions<
    DerivedConditionEra,
    Error,
    UseUpdateApiConditionErasConditionEraIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      condition_era_id,
      body,
    }: UseUpdateApiConditionErasConditionEraIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/condition-eras/${condition_era_id}`,
        {
          method: 'PUT',
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
