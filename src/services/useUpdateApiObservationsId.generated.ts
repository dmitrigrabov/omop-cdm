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

export type UseUpdateApiObservationsIdArgs = {
  id: string
  body: ClinicalObservationCreate
}

export const useUpdateApiObservationsId = (
  args: UseMutationOptions<
    ClinicalObservation,
    Error,
    UseUpdateApiObservationsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UseUpdateApiObservationsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/observations/${id}`,
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
