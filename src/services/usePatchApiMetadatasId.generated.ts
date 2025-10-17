import { MetadataMetadataUpdate } from '@/types/metadataMetadataUpdate.generated.ts'
import {
  metadataMetadata,
  MetadataMetadata,
} from '@/types/metadataMetadata.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UsePatchApiMetadatasIdArgs = {
  id: string
  body: MetadataMetadataUpdate
}

export const usePatchApiMetadatasId = (
  args: UseMutationOptions<
    MetadataMetadata,
    Error,
    UsePatchApiMetadatasIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiMetadatasIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/metadatas/${id}`,
        {
          method: 'PATCH',
          body,
        },
      )

      if (error) {
        throw error
      }

      return metadataMetadata.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ['Metadata - Metadatas'] })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
