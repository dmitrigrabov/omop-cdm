import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiDomainsDomainIdArgs = { domain_id: string }

export const useDeleteApiDomainsDomainIdResponse = z.void()

export type UseDeleteApiDomainsDomainIdResponse = void

export type DeleteApiDomainsDomainIdBody = void

export const useDeleteApiDomainsDomainId = (
  args: UseMutationOptions<
    UseDeleteApiDomainsDomainIdResponse,
    Error,
    UseDeleteApiDomainsDomainIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ domain_id }: UseDeleteApiDomainsDomainIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/domains/${domain_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiDomainsDomainIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ['Vocabulary - Domains'] })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
