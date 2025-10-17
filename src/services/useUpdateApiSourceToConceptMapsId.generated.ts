import { VocabularySourceToConceptMapCreate } from '@/types/vocabularySourceToConceptMapCreate.generated.ts'
import {
  vocabularySourceToConceptMap,
  VocabularySourceToConceptMap,
} from '@/types/vocabularySourceToConceptMap.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseUpdateApiSourceToConceptMapsIdArgs = {
  id: number
  body: VocabularySourceToConceptMapCreate
}

export const useUpdateApiSourceToConceptMapsId = (
  args: UseMutationOptions<
    VocabularySourceToConceptMap,
    Error,
    UseUpdateApiSourceToConceptMapsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UseUpdateApiSourceToConceptMapsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/source-to-concept-maps/${id}`,
        {
          method: 'PUT',
          body,
        },
      )

      if (error) {
        throw error
      }

      return vocabularySourceToConceptMap.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Vocabulary - SourceToConceptMaps'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
