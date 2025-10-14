import { ClinicalNoteNlpUpdate } from '@/types/clinicalNoteNlpUpdate.generated.ts'
import {
  clinicalNoteNlp,
  ClinicalNoteNlp,
} from '@/types/clinicalNoteNlp.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'
import { z } from 'zod'

export type UsePatchApiNoteNlpsNoteNlpIdArgs = {
  note_nlp_id: number
  body: ClinicalNoteNlpUpdate
}

export const usePatchApiNoteNlpsNoteNlpId = (
  args: UseMutationOptions<
    ClinicalNoteNlp,
    Error,
    UsePatchApiNoteNlpsNoteNlpIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      note_nlp_id,
      body,
    }: UsePatchApiNoteNlpsNoteNlpIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/note-nlps/${note_nlp_id}`,
        {
          method: 'PATCH',
          body,
        },
      )

      if (error) {
        throw error
      }

      return clinicalNoteNlp.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ['Clinical - NoteNlps'] })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
