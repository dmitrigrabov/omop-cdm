import { vocabularySourceToConceptMap } from '@/types/vocabularySourceToConceptMap.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiSourceToConceptMapsIdArgs = { id: string }

export const useGetApiSourceToConceptMapsId = ({
  id,
}: UseGetApiSourceToConceptMapsIdArgs) => {
  const result = useQuery({
    queryKey: ['Vocabulary - SourceToConceptMaps', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/source-to-concept-maps/${id}`,
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
