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

export type UseUpdateApiLocationsIdArgs = {
  id: string
  body: HealthsystemLocationCreate
}

export const useUpdateApiLocationsId = (
  args: UseMutationOptions<
    HealthsystemLocation,
    Error,
    UseUpdateApiLocationsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UseUpdateApiLocationsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/locations/${id}`,
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
