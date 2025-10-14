import { VocabularyConceptClassUpdate } from '@/types/vocabularyConceptClassUpdate.generated.ts'
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

export type UsePatchApiConceptClasssConceptClassIdArgs = {
  concept_class_id: string
  body: VocabularyConceptClassUpdate
}

export const usePatchApiConceptClasssConceptClassId = (
  args: UseMutationOptions<
    VocabularyConceptClass,
    Error,
    UsePatchApiConceptClasssConceptClassIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      concept_class_id,
      body,
    }: UsePatchApiConceptClasssConceptClassIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-classs/${concept_class_id}`,
        {
          method: 'PATCH',
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
