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

export type UseUpdateApiObservationPeriodsIdArgs = {
  id: number
  body: ClinicalObservationPeriodCreate
}

export const useUpdateApiObservationPeriodsId = (
  args: UseMutationOptions<
    ClinicalObservationPeriod,
    Error,
    UseUpdateApiObservationPeriodsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UseUpdateApiObservationPeriodsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/observation-periods/${id}`,
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
