import { HealthsystemCareSiteUpdate } from '@/types/healthsystemCareSiteUpdate.generated.ts'
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

export type UsePatchApiCareSitesCareSiteIdArgs = {
  care_site_id: number
  body: HealthsystemCareSiteUpdate
}

export const usePatchApiCareSitesCareSiteId = (
  args: UseMutationOptions<
    HealthsystemCareSite,
    Error,
    UsePatchApiCareSitesCareSiteIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      care_site_id,
      body,
    }: UsePatchApiCareSitesCareSiteIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/care-sites/${care_site_id}`,
        {
          method: 'PATCH',
          body,
        },
      )

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
