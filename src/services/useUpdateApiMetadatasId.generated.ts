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

export type UseUpdateApiMetadatasIdArgs = {
  id: string
  body: MetadataMetadataCreate
}

export const useUpdateApiMetadatasId = (
  args: UseMutationOptions<
    MetadataMetadata,
    Error,
    UseUpdateApiMetadatasIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UseUpdateApiMetadatasIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/metadatas/${id}`,
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
