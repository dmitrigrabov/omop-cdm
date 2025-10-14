import { HealthsystemProviderCreate } from '@/types/healthsystemProviderCreate.generated.ts'
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
import { z } from 'zod'

export type UseUpdateApiProvidersProviderIdArgs = {
  provider_id: number
  body: HealthsystemProviderCreate
}

export const useUpdateApiProvidersProviderId = (
  args: UseMutationOptions<
    HealthsystemProvider,
    Error,
    UseUpdateApiProvidersProviderIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      provider_id,
      body,
    }: UseUpdateApiProvidersProviderIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/providers/${provider_id}`,
        {
          method: 'PUT',
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
