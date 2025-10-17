import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiSpecimensIdArgs = { id: string }

export const useDeleteApiSpecimensIdResponse = z.void()

export type UseDeleteApiSpecimensIdResponse = void

export type DeleteApiSpecimensIdBody = void

export const useDeleteApiSpecimensId = (
  args: UseMutationOptions<
    UseDeleteApiSpecimensIdResponse,
    Error,
    UseDeleteApiSpecimensIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiSpecimensIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/specimens/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiSpecimensIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ['Clinical - Specimens'] })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
