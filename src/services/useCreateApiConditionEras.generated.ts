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

export type UseCreateApiConditionErasArgs = { body: DerivedConditionEraCreate }

export const useCreateApiConditionEras = (
  args: UseMutationOptions<
    DerivedConditionEra,
    Error,
    UseCreateApiConditionErasArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ body }: UseCreateApiConditionErasArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/condition-eras`,
        {
          method: 'POST',
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
