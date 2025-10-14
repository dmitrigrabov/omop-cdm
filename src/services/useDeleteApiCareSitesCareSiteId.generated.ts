import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiCareSitesCareSiteIdArgs = { care_site_id: number }

export const useDeleteApiCareSitesCareSiteIdResponse = z.void()

export type UseDeleteApiCareSitesCareSiteIdResponse = void

export type DeleteApiCareSitesCareSiteIdBody = void

export const useDeleteApiCareSitesCareSiteId = (
  args: UseMutationOptions<
    UseDeleteApiCareSitesCareSiteIdResponse,
    Error,
    UseDeleteApiCareSitesCareSiteIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      care_site_id,
    }: UseDeleteApiCareSitesCareSiteIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/care-sites/${care_site_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiCareSitesCareSiteIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Health System - CareSites'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
