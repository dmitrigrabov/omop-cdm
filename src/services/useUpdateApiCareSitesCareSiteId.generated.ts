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

export type UseUpdateApiCareSitesCareSiteIdArgs = {
  care_site_id: number
  body: HealthsystemCareSiteCreate
}

export const useUpdateApiCareSitesCareSiteId = (
  args: UseMutationOptions<
    HealthsystemCareSite,
    Error,
    UseUpdateApiCareSitesCareSiteIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      care_site_id,
      body,
    }: UseUpdateApiCareSitesCareSiteIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/care-sites/${care_site_id}`,
        {
          method: 'PUT',
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
