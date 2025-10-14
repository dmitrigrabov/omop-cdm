import { ClinicalObservationCreate } from '@/types/clinicalObservationCreate.generated.ts'
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

export type UseUpdateApiObservationsObservationIdArgs = {
  observation_id: number
  body: ClinicalObservationCreate
}

export const useUpdateApiObservationsObservationId = (
  args: UseMutationOptions<
    ClinicalObservation,
    Error,
    UseUpdateApiObservationsObservationIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      observation_id,
      body,
    }: UseUpdateApiObservationsObservationIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/observations/${observation_id}`,
        {
          method: 'PUT',
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
