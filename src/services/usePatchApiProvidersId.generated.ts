import { HealthsystemProviderUpdate } from '@/types/healthsystemProviderUpdate.generated.ts'
import {
  healthsystemProvider,
  HealthsystemProvider,
} from '@/types/healthsystemProvider.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UsePatchApiProvidersIdArgs = {
  id: string
  body: HealthsystemProviderUpdate
}

export const usePatchApiProvidersId = (
  args: UseMutationOptions<
    HealthsystemProvider,
    Error,
    UsePatchApiProvidersIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiProvidersIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/providers/${id}`,
        {
          method: 'PATCH',
          body,
        },
      )

      if (error) {
        throw error
      }

      return healthsystemProvider.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Health System - Providers'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
