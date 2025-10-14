import { ClinicalObservationUpdate } from '@/types/clinicalObservationUpdate.generated.ts'
import {
  clinicalObservation,
  ClinicalObservation,
} from '@/types/clinicalObservation.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'
import { z } from 'zod'

export type UsePatchApiObservationsObservationIdArgs = {
  observation_id: number
  body: ClinicalObservationUpdate
}

export const usePatchApiObservationsObservationId = (
  args: UseMutationOptions<
    ClinicalObservation,
    Error,
    UsePatchApiObservationsObservationIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      observation_id,
      body,
    }: UsePatchApiObservationsObservationIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/observations/${observation_id}`,
        {
          method: 'PATCH',
          body,
        },
      )

      if (error) {
        throw error
      }

      return clinicalObservation.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Clinical - Observations'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
