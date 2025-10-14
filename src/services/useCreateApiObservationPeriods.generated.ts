import { ClinicalObservationPeriodCreate } from '@/types/clinicalObservationPeriodCreate.generated.ts'
import {
  clinicalObservationPeriod,
  ClinicalObservationPeriod,
} from '@/types/clinicalObservationPeriod.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'
import { z } from 'zod'

export type UseCreateApiObservationPeriodsArgs = {
  body: ClinicalObservationPeriodCreate
}

export const useCreateApiObservationPeriods = (
  args: UseMutationOptions<
    ClinicalObservationPeriod,
    Error,
    UseCreateApiObservationPeriodsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ body }: UseCreateApiObservationPeriodsArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/observation-periods`,
        {
          method: 'POST',
          body,
        },
      )

      if (error) {
        throw error
      }

      return clinicalObservationPeriod.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Clinical - ObservationPeriods'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
