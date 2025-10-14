import { vocabularySourceToConceptMap } from '@/types/vocabularySourceToConceptMap.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiSourceToConceptMapsSourceToConceptMapIdArgs = {
  source_to_concept_map_id: number
}

export const useGetApiSourceToConceptMapsSourceToConceptMapId = ({
  source_to_concept_map_id,
}: UseGetApiSourceToConceptMapsSourceToConceptMapIdArgs) => {
  const result = useQuery({
    queryKey: ['Vocabulary - SourceToConceptMaps', source_to_concept_map_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/source-to-concept-maps/${source_to_concept_map_id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return vocabularySourceToConceptMap.parse(data)
    },
  })

  return result
}
