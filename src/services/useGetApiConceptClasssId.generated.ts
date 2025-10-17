import { vocabularyConceptClass } from '@/types/vocabularyConceptClass.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiConceptClasssIdArgs = { id: string }

export const useGetApiConceptClasssId = ({
  id,
}: UseGetApiConceptClasssIdArgs) => {
  const result = useQuery({
    queryKey: ['Vocabulary - ConceptClasss', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-classs/${id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return vocabularyConceptClass.parse(data)
    },
  })

  return result
}
