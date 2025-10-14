import { vocabularyConcept } from '@/types/vocabularyConcept.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiConceptsConceptIdArgs = { concept_id: number }

export const useGetApiConceptsConceptId = ({
  concept_id,
}: UseGetApiConceptsConceptIdArgs) => {
  const result = useQuery({
    queryKey: ['Vocabulary - Concepts', concept_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/concepts/${concept_id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return vocabularyConcept.parse(data)
    },
  })

  return result
}
