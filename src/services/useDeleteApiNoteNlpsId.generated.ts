import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiNoteNlpsIdArgs = { id: number }

export const useDeleteApiNoteNlpsIdResponse = z.void()

export type UseDeleteApiNoteNlpsIdResponse = void

export type DeleteApiNoteNlpsIdBody = void

export const useDeleteApiNoteNlpsId = (
  args: UseMutationOptions<
    UseDeleteApiNoteNlpsIdResponse,
    Error,
    UseDeleteApiNoteNlpsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiNoteNlpsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/note-nlps/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiNoteNlpsIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ['Clinical - NoteNlps'] })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
