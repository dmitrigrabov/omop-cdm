import { VocabularyDrugStrengthUpdate } from '@/types/vocabularyDrugStrengthUpdate.generated.ts'
import {
  vocabularyDrugStrength,
  VocabularyDrugStrength,
} from '@/types/vocabularyDrugStrength.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UsePatchApiDrugStrengthsIdArgs = {
  id: number
  body: VocabularyDrugStrengthUpdate
}

export const usePatchApiDrugStrengthsId = (
  args: UseMutationOptions<
    VocabularyDrugStrength,
    Error,
    UsePatchApiDrugStrengthsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiDrugStrengthsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/drug-strengths/${id}`,
        {
          method: 'PATCH',
          body,
        },
      )

      if (error) {
        throw error
      }

      return vocabularyDrugStrength.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Vocabulary - DrugStrengths'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
