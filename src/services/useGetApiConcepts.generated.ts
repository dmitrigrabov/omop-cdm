import { vocabularyConcept } from '@/types/vocabularyConcept.generated.ts'
import { z } from 'zod'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export const useGetApiConceptsResponse = z.object({
  data: z.array(vocabularyConcept),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type UseGetApiConceptsArgs = {
  offset?: number | undefined
  limit?: number | undefined
  domain_id?: string | undefined
  vocabulary_id?: string | undefined
  concept_class_id?: string | undefined
  sort_by?: 'concept_id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiConcepts = ({
  offset,
  limit,
  domain_id,
  vocabulary_id,
  concept_class_id,
  sort_by,
  sort_order,
}: UseGetApiConceptsArgs) => {
  const result = useQuery({
    queryKey: [
      'Vocabulary - Concepts',
      offset,
      limit,
      domain_id,
      vocabulary_id,
      concept_class_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(`/concepts`, {
        method: 'GET',
      })

      if (error) {
        throw error
      }

      return useGetApiConceptsResponse.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
