import { HealthsystemLocationCreate } from '@/types/healthsystemLocationCreate.generated.ts'
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

export type UseUpdateApiLocationsLocationIdArgs = {
  location_id: number
  body: HealthsystemLocationCreate
}

export const useUpdateApiLocationsLocationId = (
  args: UseMutationOptions<
    HealthsystemLocation,
    Error,
    UseUpdateApiLocationsLocationIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      location_id,
      body,
    }: UseUpdateApiLocationsLocationIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/locations/${location_id}`,
        {
          method: 'PUT',
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
