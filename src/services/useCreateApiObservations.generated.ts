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

export type UseCreateApiObservationsArgs = { body: ClinicalObservationCreate }

export const useCreateApiObservations = (
  args: UseMutationOptions<
    ClinicalObservation,
    Error,
    UseCreateApiObservationsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ body }: UseCreateApiObservationsArgs) => {
      const { data, error } = await supabase.functions.invoke(`/observations`, {
        method: 'POST',
        body,
      })

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
