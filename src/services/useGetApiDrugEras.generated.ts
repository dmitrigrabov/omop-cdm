import { derivedDrugEra } from '@/types/derivedDrugEra.generated.ts'
import { z } from 'zod'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export const useGetApiDrugErasResponse = z.object({
  data: z.array(derivedDrugEra),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type UseGetApiDrugErasArgs = {
  offset?: number | undefined
  limit?: number | undefined
  person_id?: number | undefined
  drug_concept_id?: CommonConceptId | undefined
  sort_by?: 'drug_era_id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiDrugEras = ({
  offset,
  limit,
  person_id,
  drug_concept_id,
  sort_by,
  sort_order,
}: UseGetApiDrugErasArgs) => {
  const result = useQuery({
    queryKey: [
      'Derived - DrugEras',
      offset,
      limit,
      person_id,
      drug_concept_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(`/drug-eras`, {
        method: 'GET',
      })

      if (error) {
        throw error
      }

      return useGetApiDrugErasResponse.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
