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

export type UseCreateApiSpecimensArgs = { body: ClinicalSpecimenCreate }

export const useCreateApiSpecimens = (
  args: UseMutationOptions<
    ClinicalSpecimen,
    Error,
    UseCreateApiSpecimensArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ body }: UseCreateApiSpecimensArgs) => {
      const { data, error } = await supabase.functions.invoke(`/specimens`, {
        method: 'POST',
        body,
      })

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
