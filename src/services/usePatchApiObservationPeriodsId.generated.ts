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

export type UsePatchApiObservationPeriodsIdArgs = {
  id: string
  body: ClinicalObservationPeriodUpdate
}

export const usePatchApiObservationPeriodsId = (
  args: UseMutationOptions<
    ClinicalObservationPeriod,
    Error,
    UsePatchApiObservationPeriodsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiObservationPeriodsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/observation-periods/${id}`,
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
