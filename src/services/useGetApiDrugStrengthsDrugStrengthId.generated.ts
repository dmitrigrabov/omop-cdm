import { vocabularyDrugStrength } from '@/types/vocabularyDrugStrength.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiDrugStrengthsDrugStrengthIdArgs = {
  drug_strength_id: number
}

export const useGetApiDrugStrengthsDrugStrengthId = ({
  drug_strength_id,
}: UseGetApiDrugStrengthsDrugStrengthIdArgs) => {
  const result = useQuery({
    queryKey: ['Vocabulary - DrugStrengths', drug_strength_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/drug-strengths/${drug_strength_id}`,
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
