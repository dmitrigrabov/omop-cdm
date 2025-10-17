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

export type UseUpdateApiCdmSourcesIdArgs = {
  id: number
  body: MetadataCdmSourceCreate
}

export const useUpdateApiCdmSourcesId = (
  args: UseMutationOptions<
    MetadataCdmSource,
    Error,
    UseUpdateApiCdmSourcesIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UseUpdateApiCdmSourcesIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/cdm-sources/${id}`,
        {
          method: 'PUT',
          body,
        },
      )

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
