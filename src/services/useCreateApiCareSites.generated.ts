import { HealthsystemCareSiteCreate } from '@/types/healthsystemCareSiteCreate.generated.ts'
import {
  healthsystemCareSite,
  HealthsystemCareSite,
} from '@/types/healthsystemCareSite.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'
import { z } from 'zod'

export type UseCreateApiCareSitesArgs = { body: HealthsystemCareSiteCreate }

export const useCreateApiCareSites = (
  args: UseMutationOptions<
    HealthsystemCareSite,
    Error,
    UseCreateApiCareSitesArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ body }: UseCreateApiCareSitesArgs) => {
      const { data, error } = await supabase.functions.invoke(`/care-sites`, {
        method: 'POST',
        body,
      })

      if (error) {
        throw error
      }

      return healthsystemCareSite.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Health System - CareSites'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
