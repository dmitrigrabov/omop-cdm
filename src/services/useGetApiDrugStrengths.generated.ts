import { vocabularyDrugStrength } from '@/types/vocabularyDrugStrength.generated.ts'
import { z } from 'zod'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export const useGetApiDrugStrengthsResponse = z.object({
  data: z.array(vocabularyDrugStrength),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type UseGetApiDrugStrengthsArgs = {
  offset?: number | undefined
  limit?: number | undefined
  drug_concept_id?: CommonConceptId | undefined
  ingredient_concept_id?: CommonConceptId | undefined
  amount_unit_concept_id?: CommonConceptId | undefined
  numerator_unit_concept_id?: CommonConceptId | undefined
  denominator_unit_concept_id?: CommonConceptId | undefined
  sort_by?: 'drug_strength_id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiDrugStrengths = ({
  offset,
  limit,
  drug_concept_id,
  ingredient_concept_id,
  amount_unit_concept_id,
  numerator_unit_concept_id,
  denominator_unit_concept_id,
  sort_by,
  sort_order,
}: UseGetApiDrugStrengthsArgs) => {
  const result = useQuery({
    queryKey: [
      'Vocabulary - DrugStrengths',
      offset,
      limit,
      drug_concept_id,
      ingredient_concept_id,
      amount_unit_concept_id,
      numerator_unit_concept_id,
      denominator_unit_concept_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/drug-strengths`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return useGetApiDrugStrengthsResponse.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
