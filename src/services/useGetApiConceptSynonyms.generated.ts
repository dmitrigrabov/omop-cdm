import { vocabularyConceptSynonym } from '@/types/vocabularyConceptSynonym.generated.ts'
import { z } from 'zod'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export const useGetApiConceptSynonymsResponse = z.object({
  data: z.array(vocabularyConceptSynonym),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type UseGetApiConceptSynonymsArgs = {
  offset?: number | undefined
  limit?: number | undefined
  concept_id?: CommonConceptId | undefined
  language_concept_id?: CommonConceptId | undefined
  sort_by?: 'concept_synonym_id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiConceptSynonyms = ({
  offset,
  limit,
  concept_id,
  language_concept_id,
  sort_by,
  sort_order,
}: UseGetApiConceptSynonymsArgs) => {
  const result = useQuery({
    queryKey: [
      'Vocabulary - ConceptSynonyms',
      offset,
      limit,
      concept_id,
      language_concept_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-synonyms`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return useGetApiConceptSynonymsResponse.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
