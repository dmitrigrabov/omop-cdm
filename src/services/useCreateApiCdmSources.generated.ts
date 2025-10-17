import { MetadataCdmSourceCreate } from '@/types/metadataCdmSourceCreate.generated.ts'
import {
  metadataCdmSource,
  MetadataCdmSource,
} from '@/types/metadataCdmSource.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseCreateApiCdmSourcesArgs = { body: MetadataCdmSourceCreate }

export const useCreateApiCdmSources = (
  args: UseMutationOptions<
    MetadataCdmSource,
    Error,
    UseCreateApiCdmSourcesArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ body }: UseCreateApiCdmSourcesArgs) => {
      const { data, error } = await supabase.functions.invoke(`/cdm-sources`, {
        method: 'POST',
        body,
      })

      if (error) {
        throw error
      }

      return metadataCdmSource.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Metadata - CdmSources'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
