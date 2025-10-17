import { metadataCdmSource } from '@/types/metadataCdmSource.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiCdmSourcesIdArgs = { id: number }

export const useGetApiCdmSourcesId = ({ id }: UseGetApiCdmSourcesIdArgs) => {
  const result = useQuery({
    queryKey: ['Metadata - CdmSources', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/cdm-sources/${id}`,
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
