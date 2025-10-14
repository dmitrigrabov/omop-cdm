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
import { z } from 'zod'

export type UseUpdateApiCdmSourcesCdmSourceIdArgs = {
  cdm_source_id: number
  body: MetadataCdmSourceCreate
}

export const useUpdateApiCdmSourcesCdmSourceId = (
  args: UseMutationOptions<
    MetadataCdmSource,
    Error,
    UseUpdateApiCdmSourcesCdmSourceIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      cdm_source_id,
      body,
    }: UseUpdateApiCdmSourcesCdmSourceIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/cdm-sources/${cdm_source_id}`,
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
