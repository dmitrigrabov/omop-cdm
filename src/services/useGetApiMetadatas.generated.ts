import { metadataMetadataList } from '@/types/metadataMetadataList.generated.ts'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export type UseGetApiMetadatasArgs = {
  offset?: number | undefined
  limit?: number | undefined
  metadata_concept_id?: CommonConceptId | undefined
  metadata_type_concept_id?: CommonConceptId | undefined
  value_as_concept_id?: CommonConceptId | undefined
  sort_by?: 'id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiMetadatas = ({
  offset,
  limit,
  metadata_concept_id,
  metadata_type_concept_id,
  value_as_concept_id,
  sort_by,
  sort_order,
}: UseGetApiMetadatasArgs) => {
  const result = useQuery({
    queryKey: [
      'Metadata - Metadatas',
      offset,
      limit,
      metadata_concept_id,
      metadata_type_concept_id,
      value_as_concept_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(`/metadatas`, {
        method: 'GET',
      })

      if (error) {
        throw error
      }

      return metadataMetadataList.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
