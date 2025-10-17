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

export type UseUpdateApiConditionErasIdArgs = {
  id: number
  body: DerivedConditionEraCreate
}

export const useUpdateApiConditionErasId = (
  args: UseMutationOptions<
    DerivedConditionEra,
    Error,
    UseUpdateApiConditionErasIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UseUpdateApiConditionErasIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/condition-eras/${id}`,
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
