import { VocabularyDrugStrengthCreate } from '@/types/vocabularyDrugStrengthCreate.generated.ts'
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

export type UseUpdateApiDrugStrengthsDrugStrengthIdArgs = {
  drug_strength_id: number
  body: VocabularyDrugStrengthCreate
}

export const useUpdateApiDrugStrengthsDrugStrengthId = (
  args: UseMutationOptions<
    VocabularyDrugStrength,
    Error,
    UseUpdateApiDrugStrengthsDrugStrengthIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      drug_strength_id,
      body,
    }: UseUpdateApiDrugStrengthsDrugStrengthIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/drug-strengths/${drug_strength_id}`,
        {
          method: 'PUT',
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
