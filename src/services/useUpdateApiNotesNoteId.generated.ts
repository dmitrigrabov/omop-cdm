import { ClinicalNoteCreate } from '@/types/clinicalNoteCreate.generated.ts'
import { clinicalNote, ClinicalNote } from '@/types/clinicalNote.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'
import { z } from 'zod'

export type UseUpdateApiNotesNoteIdArgs = {
  note_id: number
  body: ClinicalNoteCreate
}

export const useUpdateApiNotesNoteId = (
  args: UseMutationOptions<
    ClinicalNote,
    Error,
    UseUpdateApiNotesNoteIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ note_id, body }: UseUpdateApiNotesNoteIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/notes/${note_id}`,
        {
          method: 'PUT',
          body,
        },
      )

      if (error) {
        throw error
      }

      return clinicalNote.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ['Clinical - Notes'] })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
