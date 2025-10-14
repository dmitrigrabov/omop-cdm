import { ClinicalObservationPeriodUpdate } from '@/types/clinicalObservationPeriodUpdate.generated.ts'
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

export type UsePatchApiObservationPeriodsObservationPeriodIdArgs = {
  observation_period_id: number
  body: ClinicalObservationPeriodUpdate
}

export const usePatchApiObservationPeriodsObservationPeriodId = (
  args: UseMutationOptions<
    ClinicalObservationPeriod,
    Error,
    UsePatchApiObservationPeriodsObservationPeriodIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      observation_period_id,
      body,
    }: UsePatchApiObservationPeriodsObservationPeriodIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/observation-periods/${observation_period_id}`,
        {
          method: 'PATCH',
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
