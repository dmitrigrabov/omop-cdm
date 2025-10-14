import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiConceptClasssConceptClassIdArgs = {
  concept_class_id: string
}

export const useDeleteApiConceptClasssConceptClassIdResponse = z.void()

export type UseDeleteApiConceptClasssConceptClassIdResponse = void

export type DeleteApiConceptClasssConceptClassIdBody = void

export const useDeleteApiConceptClasssConceptClassId = (
  args: UseMutationOptions<
    UseDeleteApiConceptClasssConceptClassIdResponse,
    Error,
    UseDeleteApiConceptClasssConceptClassIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      concept_class_id,
    }: UseDeleteApiConceptClasssConceptClassIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-classs/${concept_class_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiConceptClasssConceptClassIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Vocabulary - ConceptClasss'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
