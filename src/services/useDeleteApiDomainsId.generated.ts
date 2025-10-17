import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiDomainsIdArgs = { id: string }

export const useDeleteApiDomainsIdResponse = z.void()

export type UseDeleteApiDomainsIdResponse = void

export type DeleteApiDomainsIdBody = void

export const useDeleteApiDomainsId = (
  args: UseMutationOptions<
    UseDeleteApiDomainsIdResponse,
    Error,
    UseDeleteApiDomainsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiDomainsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/domains/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiDomainsIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ['Vocabulary - Domains'] })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
