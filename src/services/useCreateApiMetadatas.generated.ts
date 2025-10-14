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

export type UseCreateApiMetadatasArgs = { body: MetadataMetadataCreate }

export const useCreateApiMetadatas = (
  args: UseMutationOptions<
    MetadataMetadata,
    Error,
    UseCreateApiMetadatasArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ body }: UseCreateApiMetadatasArgs) => {
      const { data, error } = await supabase.functions.invoke(`/metadatas`, {
        method: 'POST',
        body,
      })

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
