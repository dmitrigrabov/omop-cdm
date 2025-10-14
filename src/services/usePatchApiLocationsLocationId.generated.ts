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
import { z } from 'zod'

export type UsePatchApiLocationsLocationIdArgs = {
  location_id: number
  body: HealthsystemLocationUpdate
}

export const usePatchApiLocationsLocationId = (
  args: UseMutationOptions<
    HealthsystemLocation,
    Error,
    UsePatchApiLocationsLocationIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      location_id,
      body,
    }: UsePatchApiLocationsLocationIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/locations/${location_id}`,
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
