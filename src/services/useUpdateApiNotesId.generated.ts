import { ClinicalNoteCreate } from '@/types/clinicalNoteCreate.generated.ts'
import { clinicalNote, ClinicalNote } from '@/types/clinicalNote.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'
import { z } from 'zod'

export type UseUpdateApiNotesIdArgs = { id: number; body: ClinicalNoteCreate }

export const useUpdateApiNotesId = (
  args: UseMutationOptions<
    ClinicalNote,
    Error,
    UseUpdateApiNotesIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UseUpdateApiNotesIdArgs) => {
      const { data, error } = await supabase.functions.invoke(`/notes/${id}`, {
        method: 'PUT',
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
