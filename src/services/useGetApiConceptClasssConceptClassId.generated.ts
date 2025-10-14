import { vocabularyConceptClass } from '@/types/vocabularyConceptClass.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiConceptClasssConceptClassIdArgs = {
  concept_class_id: string
}

export const useGetApiConceptClasssConceptClassId = ({
  concept_class_id,
}: UseGetApiConceptClasssConceptClassIdArgs) => {
  const result = useQuery({
    queryKey: ['Vocabulary - ConceptClasss', concept_class_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-classs/${concept_class_id}`,
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
