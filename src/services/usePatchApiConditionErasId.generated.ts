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

export type UsePatchApiConditionErasIdArgs = {
  id: number
  body: DerivedConditionEraUpdate
}

export const usePatchApiConditionErasId = (
  args: UseMutationOptions<
    DerivedConditionEra,
    Error,
    UsePatchApiConditionErasIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiConditionErasIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/condition-eras/${id}`,
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
