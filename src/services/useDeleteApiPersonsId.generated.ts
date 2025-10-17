import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiPersonsIdArgs = { id: number }

export const useDeleteApiPersonsIdResponse = z.void()

export type UseDeleteApiPersonsIdResponse = void

export type DeleteApiPersonsIdBody = void

export const useDeleteApiPersonsId = (
  args: UseMutationOptions<
    UseDeleteApiPersonsIdResponse,
    Error,
    UseDeleteApiPersonsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiPersonsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/persons/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiPersonsIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ['Clinical - Persons'] })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
