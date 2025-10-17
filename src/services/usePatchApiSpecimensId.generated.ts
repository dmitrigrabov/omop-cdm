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

export type UsePatchApiSpecimensIdArgs = {
  id: number
  body: ClinicalSpecimenUpdate
}

export const usePatchApiSpecimensId = (
  args: UseMutationOptions<
    ClinicalSpecimen,
    Error,
    UsePatchApiSpecimensIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiSpecimensIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/specimens/${id}`,
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
