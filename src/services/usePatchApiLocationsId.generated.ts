import { HealthsystemLocationUpdate } from '@/types/healthsystemLocationUpdate.generated.ts'
import {
  healthsystemLocation,
  HealthsystemLocation,
} from '@/types/healthsystemLocation.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UsePatchApiLocationsIdArgs = {
  id: string
  body: HealthsystemLocationUpdate
}

export const usePatchApiLocationsId = (
  args: UseMutationOptions<
    HealthsystemLocation,
    Error,
    UsePatchApiLocationsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiLocationsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/locations/${id}`,
        {
          method: 'PATCH',
          body,
        },
      )

      if (error) {
        throw error
      }

      return healthsystemLocation.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Health System - Locations'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
