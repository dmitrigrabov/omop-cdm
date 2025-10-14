import { MetadataMetadataCreate } from '@/types/metadataMetadataCreate.generated.ts'
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

export type UseUpdateApiMetadatasMetadataIdArgs = {
  metadata_id: number
  body: MetadataMetadataCreate
}

export const useUpdateApiMetadatasMetadataId = (
  args: UseMutationOptions<
    MetadataMetadata,
    Error,
    UseUpdateApiMetadatasMetadataIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      metadata_id,
      body,
    }: UseUpdateApiMetadatasMetadataIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/metadatas/${metadata_id}`,
        {
          method: 'PUT',
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
