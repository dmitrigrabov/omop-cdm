import { metadataCdmSourceList } from '@/types/metadataCdmSourceList.generated.ts'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export type UseGetApiCdmSourcesArgs = {
  offset?: number | undefined
  limit?: number | undefined
  cdm_version_concept_id?: CommonConceptId | undefined
  sort_by?: 'id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiCdmSources = ({
  offset,
  limit,
  cdm_version_concept_id,
  sort_by,
  sort_order,
}: UseGetApiCdmSourcesArgs) => {
  const result = useQuery({
    queryKey: [
      'Metadata - CdmSources',
      offset,
      limit,
      cdm_version_concept_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(`/cdm-sources`, {
        method: 'GET',
      })

      if (error) {
        throw error
      }

      return metadataCdmSourceList.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
