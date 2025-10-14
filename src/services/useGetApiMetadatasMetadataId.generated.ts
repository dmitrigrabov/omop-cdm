import { metadataMetadata } from '@/types/metadataMetadata.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiMetadatasMetadataIdArgs = { metadata_id: number }

export const useGetApiMetadatasMetadataId = ({
  metadata_id,
}: UseGetApiMetadatasMetadataIdArgs) => {
  const result = useQuery({
    queryKey: ['Metadata - Metadatas', metadata_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/metadatas/${metadata_id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return metadataMetadata.parse(data)
    },
  })

  return result
}
