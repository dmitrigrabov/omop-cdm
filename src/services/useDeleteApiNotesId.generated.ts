import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiNotesIdArgs = { id: number }

export const useDeleteApiNotesIdResponse = z.void()

export type UseDeleteApiNotesIdResponse = void

export type DeleteApiNotesIdBody = void

export const useDeleteApiNotesId = (
  args: UseMutationOptions<
    UseDeleteApiNotesIdResponse,
    Error,
    UseDeleteApiNotesIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiNotesIdArgs) => {
      const { data, error } = await supabase.functions.invoke(`/notes/${id}`, {
        method: 'DELETE',
      })

      if (error) {
        throw error
      }

      return useDeleteApiNotesIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ['Clinical - Notes'] })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
