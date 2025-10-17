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

export type UseUpdateApiSpecimensIdArgs = {
  id: number
  body: ClinicalSpecimenCreate
}

export const useUpdateApiSpecimensId = (
  args: UseMutationOptions<
    ClinicalSpecimen,
    Error,
    UseUpdateApiSpecimensIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UseUpdateApiSpecimensIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/specimens/${id}`,
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
