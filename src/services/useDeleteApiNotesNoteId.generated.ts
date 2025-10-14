import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiNotesNoteIdArgs = { note_id: number }

export const useDeleteApiNotesNoteIdResponse = z.void()

export type UseDeleteApiNotesNoteIdResponse = void

export type DeleteApiNotesNoteIdBody = void

export const useDeleteApiNotesNoteId = (
  args: UseMutationOptions<
    UseDeleteApiNotesNoteIdResponse,
    Error,
    UseDeleteApiNotesNoteIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ note_id }: UseDeleteApiNotesNoteIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/notes/${note_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiNotesNoteIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ['Clinical - Notes'] })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
