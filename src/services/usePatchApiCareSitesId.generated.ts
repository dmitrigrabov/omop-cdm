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

export type UsePatchApiCareSitesIdArgs = {
  id: string
  body: HealthsystemCareSiteUpdate
}

export const usePatchApiCareSitesId = (
  args: UseMutationOptions<
    HealthsystemCareSite,
    Error,
    UsePatchApiCareSitesIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiCareSitesIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/care-sites/${id}`,
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
