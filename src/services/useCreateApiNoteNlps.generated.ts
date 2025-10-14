import { ClinicalNoteNlpCreate } from '@/types/clinicalNoteNlpCreate.generated.ts'
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

export type UseCreateApiNoteNlpsArgs = { body: ClinicalNoteNlpCreate }

export const useCreateApiNoteNlps = (
  args: UseMutationOptions<
    ClinicalNoteNlp,
    Error,
    UseCreateApiNoteNlpsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ body }: UseCreateApiNoteNlpsArgs) => {
      const { data, error } = await supabase.functions.invoke(`/note-nlps`, {
        method: 'POST',
        body,
      })

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
