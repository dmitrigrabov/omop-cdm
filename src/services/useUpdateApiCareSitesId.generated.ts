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

export type UseUpdateApiCareSitesIdArgs = {
  id: number
  body: HealthsystemCareSiteCreate
}

export const useUpdateApiCareSitesId = (
  args: UseMutationOptions<
    HealthsystemCareSite,
    Error,
    UseUpdateApiCareSitesIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UseUpdateApiCareSitesIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/care-sites/${id}`,
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
