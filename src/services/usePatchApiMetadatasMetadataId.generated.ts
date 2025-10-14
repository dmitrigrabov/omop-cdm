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
import { z } from 'zod'

export type UsePatchApiMetadatasMetadataIdArgs = {
  metadata_id: number
  body: MetadataMetadataUpdate
}

export const usePatchApiMetadatasMetadataId = (
  args: UseMutationOptions<
    MetadataMetadata,
    Error,
    UsePatchApiMetadatasMetadataIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      metadata_id,
      body,
    }: UsePatchApiMetadatasMetadataIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/metadatas/${metadata_id}`,
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
