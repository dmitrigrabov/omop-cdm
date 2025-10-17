import { VocabularySourceToConceptMapUpdate } from '@/types/vocabularySourceToConceptMapUpdate.generated.ts'
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

export type UsePatchApiSourceToConceptMapsIdArgs = {
  id: number
  body: VocabularySourceToConceptMapUpdate
}

export const usePatchApiSourceToConceptMapsId = (
  args: UseMutationOptions<
    VocabularySourceToConceptMap,
    Error,
    UsePatchApiSourceToConceptMapsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiSourceToConceptMapsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/source-to-concept-maps/${id}`,
        {
          method: 'PATCH',
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
