import { vocabularyConcept } from '@/types/vocabularyConcept.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiConceptsIdArgs = { id: string }

export const useGetApiConceptsId = ({ id }: UseGetApiConceptsIdArgs) => {
  const result = useQuery({
    queryKey: ['Vocabulary - Concepts', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/concepts/${id}`,
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
