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

export type UsePatchApiObservationsIdArgs = {
  id: number
  body: ClinicalObservationUpdate
}

export const usePatchApiObservationsId = (
  args: UseMutationOptions<
    ClinicalObservation,
    Error,
    UsePatchApiObservationsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiObservationsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/observations/${id}`,
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
