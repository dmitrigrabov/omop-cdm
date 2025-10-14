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
import { z } from 'zod'

export type UsePatchApiSourceToConceptMapsSourceToConceptMapIdArgs = {
  source_to_concept_map_id: number
  body: VocabularySourceToConceptMapUpdate
}

export const usePatchApiSourceToConceptMapsSourceToConceptMapId = (
  args: UseMutationOptions<
    VocabularySourceToConceptMap,
    Error,
    UsePatchApiSourceToConceptMapsSourceToConceptMapIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      source_to_concept_map_id,
      body,
    }: UsePatchApiSourceToConceptMapsSourceToConceptMapIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/source-to-concept-maps/${source_to_concept_map_id}`,
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
