import { VocabularyConceptClassCreate } from '@/types/vocabularyConceptClassCreate.generated.ts'
import {
  vocabularyConceptClass,
  VocabularyConceptClass,
} from '@/types/vocabularyConceptClass.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'
import { z } from 'zod'

export type UseUpdateApiConceptClasssConceptClassIdArgs = {
  concept_class_id: string
  body: VocabularyConceptClassCreate
}

export const useUpdateApiConceptClasssConceptClassId = (
  args: UseMutationOptions<
    VocabularyConceptClass,
    Error,
    UseUpdateApiConceptClasssConceptClassIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      concept_class_id,
      body,
    }: UseUpdateApiConceptClasssConceptClassIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-classs/${concept_class_id}`,
        {
          method: 'PUT',
          body,
        },
      )

      if (error) {
        throw error
      }

      return vocabularyConceptClass.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Vocabulary - ConceptClasss'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
