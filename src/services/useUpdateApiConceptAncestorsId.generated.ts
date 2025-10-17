import { VocabularyConceptAncestorCreate } from '@/types/vocabularyConceptAncestorCreate.generated.ts'
import {
  vocabularyConceptAncestor,
  VocabularyConceptAncestor,
} from '@/types/vocabularyConceptAncestor.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'
import { z } from 'zod'

export type UseUpdateApiConceptAncestorsIdArgs = {
  id: number
  body: VocabularyConceptAncestorCreate
}

export const useUpdateApiConceptAncestorsId = (
  args: UseMutationOptions<
    VocabularyConceptAncestor,
    Error,
    UseUpdateApiConceptAncestorsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UseUpdateApiConceptAncestorsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-ancestors/${id}`,
        {
          method: 'PUT',
          body,
        },
      )

      if (error) {
        throw error
      }

      return vocabularyConceptAncestor.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Vocabulary - ConceptAncestors'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
