import { vocabularySourceToConceptMap } from '@/types/vocabularySourceToConceptMap.generated.ts'
import { z } from 'zod'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export const useGetApiSourceToConceptMapsResponse = z.object({
  data: z.array(vocabularySourceToConceptMap),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type UseGetApiSourceToConceptMapsArgs = {
  offset?: number | undefined
  limit?: number | undefined
  source_concept_id?: CommonConceptId | undefined
  target_concept_id?: CommonConceptId | undefined
  target_vocabulary_id?: string | undefined
  sort_by?: 'source_to_concept_map_id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiSourceToConceptMaps = ({
  offset,
  limit,
  source_concept_id,
  target_concept_id,
  target_vocabulary_id,
  sort_by,
  sort_order,
}: UseGetApiSourceToConceptMapsArgs) => {
  const result = useQuery({
    queryKey: [
      'Vocabulary - SourceToConceptMaps',
      offset,
      limit,
      source_concept_id,
      target_concept_id,
      target_vocabulary_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/source-to-concept-maps`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return useGetApiSourceToConceptMapsResponse.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
