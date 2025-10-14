import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiSourceToConceptMapsSourceToConceptMapIdArgs = {
  source_to_concept_map_id: number
}

export const useDeleteApiSourceToConceptMapsSourceToConceptMapIdResponse =
  z.void()

export type UseDeleteApiSourceToConceptMapsSourceToConceptMapIdResponse = void

export type DeleteApiSourceToConceptMapsSourceToConceptMapIdBody = void

export const useDeleteApiSourceToConceptMapsSourceToConceptMapId = (
  args: UseMutationOptions<
    UseDeleteApiSourceToConceptMapsSourceToConceptMapIdResponse,
    Error,
    UseDeleteApiSourceToConceptMapsSourceToConceptMapIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      source_to_concept_map_id,
    }: UseDeleteApiSourceToConceptMapsSourceToConceptMapIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/source-to-concept-maps/${source_to_concept_map_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiSourceToConceptMapsSourceToConceptMapIdResponse.parse(
        data,
      )
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Vocabulary - SourceToConceptMaps'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
