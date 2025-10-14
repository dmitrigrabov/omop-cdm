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

export type UseUpdateApiObservationPeriodsObservationPeriodIdArgs = {
  observation_period_id: number
  body: ClinicalObservationPeriodCreate
}

export const useUpdateApiObservationPeriodsObservationPeriodId = (
  args: UseMutationOptions<
    ClinicalObservationPeriod,
    Error,
    UseUpdateApiObservationPeriodsObservationPeriodIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      observation_period_id,
      body,
    }: UseUpdateApiObservationPeriodsObservationPeriodIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/observation-periods/${observation_period_id}`,
        {
          method: 'PUT',
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
