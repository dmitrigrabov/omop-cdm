import { metadataCdmSource } from '@/types/metadataCdmSource.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiCdmSourcesCdmSourceIdArgs = { cdm_source_id: number }

export const useGetApiCdmSourcesCdmSourceId = ({
  cdm_source_id,
}: UseGetApiCdmSourcesCdmSourceIdArgs) => {
  const result = useQuery({
    queryKey: ['Metadata - CdmSources', cdm_source_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/cdm-sources/${cdm_source_id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return metadataCdmSource.parse(data)
    },
  })

  return result
}
