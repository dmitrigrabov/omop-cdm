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
import { z } from 'zod'

export type UsePatchApiDrugStrengthsDrugStrengthIdArgs = {
  drug_strength_id: number
  body: VocabularyDrugStrengthUpdate
}

export const usePatchApiDrugStrengthsDrugStrengthId = (
  args: UseMutationOptions<
    VocabularyDrugStrength,
    Error,
    UsePatchApiDrugStrengthsDrugStrengthIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      drug_strength_id,
      body,
    }: UsePatchApiDrugStrengthsDrugStrengthIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/drug-strengths/${drug_strength_id}`,
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
