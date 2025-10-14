import { ClinicalSpecimenCreate } from '@/types/clinicalSpecimenCreate.generated.ts'
import {
  clinicalSpecimen,
  ClinicalSpecimen,
} from '@/types/clinicalSpecimen.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'
import { z } from 'zod'

export type UseUpdateApiSpecimensSpecimenIdArgs = {
  specimen_id: number
  body: ClinicalSpecimenCreate
}

export const useUpdateApiSpecimensSpecimenId = (
  args: UseMutationOptions<
    ClinicalSpecimen,
    Error,
    UseUpdateApiSpecimensSpecimenIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      specimen_id,
      body,
    }: UseUpdateApiSpecimensSpecimenIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/specimens/${specimen_id}`,
        {
          method: 'PUT',
          body,
        },
      )

      if (error) {
        throw error
      }

      return clinicalSpecimen.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ['Clinical - Specimens'] })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
