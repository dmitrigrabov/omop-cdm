import { DerivedDoseEraCreate } from '@/types/derivedDoseEraCreate.generated.ts'
import {
  derivedDoseEra,
  DerivedDoseEra,
} from '@/types/derivedDoseEra.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'
import { z } from 'zod'

export type UseUpdateApiDoseErasDoseEraIdArgs = {
  dose_era_id: number
  body: DerivedDoseEraCreate
}

export const useUpdateApiDoseErasDoseEraId = (
  args: UseMutationOptions<
    DerivedDoseEra,
    Error,
    UseUpdateApiDoseErasDoseEraIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      dose_era_id,
      body,
    }: UseUpdateApiDoseErasDoseEraIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/dose-eras/${dose_era_id}`,
        {
          method: 'PUT',
          body,
        },
      )

      if (error) {
        throw error
      }

      return derivedDoseEra.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ['Derived - DoseEras'] })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
