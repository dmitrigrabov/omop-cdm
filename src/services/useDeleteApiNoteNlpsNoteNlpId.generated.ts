import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiNoteNlpsNoteNlpIdArgs = { note_nlp_id: number }

export const useDeleteApiNoteNlpsNoteNlpIdResponse = z.void()

export type UseDeleteApiNoteNlpsNoteNlpIdResponse = void

export type DeleteApiNoteNlpsNoteNlpIdBody = void

export const useDeleteApiNoteNlpsNoteNlpId = (
  args: UseMutationOptions<
    UseDeleteApiNoteNlpsNoteNlpIdResponse,
    Error,
    UseDeleteApiNoteNlpsNoteNlpIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ note_nlp_id }: UseDeleteApiNoteNlpsNoteNlpIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/note-nlps/${note_nlp_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiNoteNlpsNoteNlpIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ['Clinical - NoteNlps'] })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
