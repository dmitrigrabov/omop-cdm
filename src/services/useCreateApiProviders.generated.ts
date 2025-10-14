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

export type UseCreateApiProvidersArgs = { body: HealthsystemProviderCreate }

export const useCreateApiProviders = (
  args: UseMutationOptions<
    HealthsystemProvider,
    Error,
    UseCreateApiProvidersArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ body }: UseCreateApiProvidersArgs) => {
      const { data, error } = await supabase.functions.invoke(`/providers`, {
        method: 'POST',
        body,
      })

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
