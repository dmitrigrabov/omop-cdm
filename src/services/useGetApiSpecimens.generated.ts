import { clinicalSpecimenList } from '@/types/clinicalSpecimenList.generated.ts'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export type UseGetApiSpecimensArgs = {
  offset?: number | undefined
  limit?: number | undefined
  person_id?: number | undefined
  specimen_concept_id?: CommonConceptId | undefined
  specimen_type_concept_id?: CommonConceptId | undefined
  unit_concept_id?: CommonConceptId | undefined
  anatomic_site_concept_id?: CommonConceptId | undefined
  disease_status_concept_id?: CommonConceptId | undefined
  sort_by?: 'id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiSpecimens = ({
  offset,
  limit,
  person_id,
  specimen_concept_id,
  specimen_type_concept_id,
  unit_concept_id,
  anatomic_site_concept_id,
  disease_status_concept_id,
  sort_by,
  sort_order,
}: UseGetApiSpecimensArgs) => {
  const result = useQuery({
    queryKey: [
      'Clinical - Specimens',
      offset,
      limit,
      person_id,
      specimen_concept_id,
      specimen_type_concept_id,
      unit_concept_id,
      anatomic_site_concept_id,
      disease_status_concept_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(`/specimens`, {
        method: 'GET',
      })

      if (error) {
        throw error
      }

      return clinicalSpecimenList.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
