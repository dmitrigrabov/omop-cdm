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

export type UseCreateApiLocationsArgs = { body: HealthsystemLocationCreate }

export const useCreateApiLocations = (
  args: UseMutationOptions<
    HealthsystemLocation,
    Error,
    UseCreateApiLocationsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ body }: UseCreateApiLocationsArgs) => {
      const { data, error } = await supabase.functions.invoke(`/locations`, {
        method: 'POST',
        body,
      })

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
