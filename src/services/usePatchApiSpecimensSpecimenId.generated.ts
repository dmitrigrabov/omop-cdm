import { ClinicalSpecimenUpdate } from '@/types/clinicalSpecimenUpdate.generated.ts'
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

export type UsePatchApiSpecimensSpecimenIdArgs = {
  specimen_id: number
  body: ClinicalSpecimenUpdate
}

export const usePatchApiSpecimensSpecimenId = (
  args: UseMutationOptions<
    ClinicalSpecimen,
    Error,
    UsePatchApiSpecimensSpecimenIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      specimen_id,
      body,
    }: UsePatchApiSpecimensSpecimenIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/specimens/${specimen_id}`,
        {
          method: 'PATCH',
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
