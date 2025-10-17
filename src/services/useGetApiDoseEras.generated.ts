import { derivedDoseEraList } from '@/types/derivedDoseEraList.generated.ts'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export type UseGetApiDoseErasArgs = {
  offset?: number | undefined
  limit?: number | undefined
  person_id?: number | undefined
  drug_concept_id?: CommonConceptId | undefined
  unit_concept_id?: CommonConceptId | undefined
  sort_by?: 'id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiDoseEras = ({
  offset,
  limit,
  person_id,
  drug_concept_id,
  unit_concept_id,
  sort_by,
  sort_order,
}: UseGetApiDoseErasArgs) => {
  const result = useQuery({
    queryKey: [
      'Derived - DoseEras',
      offset,
      limit,
      person_id,
      drug_concept_id,
      unit_concept_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(`/dose-eras`, {
        method: 'GET',
      })

      if (error) {
        throw error
      }

      return derivedDoseEraList.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
