import { metadataMetadata } from '@/types/metadataMetadata.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiMetadatasIdArgs = { id: number }

export const useGetApiMetadatasId = ({ id }: UseGetApiMetadatasIdArgs) => {
  const result = useQuery({
    queryKey: ['Metadata - Metadatas', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/metadatas/${id}`,
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
