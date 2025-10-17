import { ClinicalNoteUpdate } from '@/types/clinicalNoteUpdate.generated.ts'
import { clinicalNote, ClinicalNote } from '@/types/clinicalNote.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'
import { z } from 'zod'

export type UsePatchApiNotesIdArgs = { id: number; body: ClinicalNoteUpdate }

export const usePatchApiNotesId = (
  args: UseMutationOptions<
    ClinicalNote,
    Error,
    UsePatchApiNotesIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiNotesIdArgs) => {
      const { data, error } = await supabase.functions.invoke(`/notes/${id}`, {
        method: 'PATCH',
        body,
      })

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
