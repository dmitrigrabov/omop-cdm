import { derivedDrugEraList } from '@/types/derivedDrugEraList.generated.ts'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export type UseGetApiDrugErasArgs = {
  offset?: number | undefined
  limit?: number | undefined
  person_id?: number | undefined
  drug_concept_id?: CommonConceptId | undefined
  sort_by?: 'id' | undefined
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

      return derivedDrugEraList.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
