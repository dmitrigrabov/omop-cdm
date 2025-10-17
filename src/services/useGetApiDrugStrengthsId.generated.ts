import { vocabularyDrugStrength } from '@/types/vocabularyDrugStrength.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiDrugStrengthsIdArgs = { id: number }

export const useGetApiDrugStrengthsId = ({
  id,
}: UseGetApiDrugStrengthsIdArgs) => {
  const result = useQuery({
    queryKey: ['Vocabulary - DrugStrengths', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/drug-strengths/${id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return vocabularyDrugStrength.parse(data)
    },
  })

  return result
}
