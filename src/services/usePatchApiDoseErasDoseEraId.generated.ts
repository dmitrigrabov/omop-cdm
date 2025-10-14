import { DerivedDoseEraUpdate } from '@/types/derivedDoseEraUpdate.generated.ts'
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

export type UsePatchApiDoseErasDoseEraIdArgs = {
  dose_era_id: number
  body: DerivedDoseEraUpdate
}

export const usePatchApiDoseErasDoseEraId = (
  args: UseMutationOptions<
    DerivedDoseEra,
    Error,
    UsePatchApiDoseErasDoseEraIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      dose_era_id,
      body,
    }: UsePatchApiDoseErasDoseEraIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/dose-eras/${dose_era_id}`,
        {
          method: 'PATCH',
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
