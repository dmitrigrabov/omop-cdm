import { ClinicalNoteCreate } from '@/types/clinicalNoteCreate.generated.ts'
import { clinicalNote, ClinicalNote } from '@/types/clinicalNote.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseCreateApiNotesArgs = { body: ClinicalNoteCreate }

export const useCreateApiNotes = (
  args: UseMutationOptions<
    ClinicalNote,
    Error,
    UseCreateApiNotesArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ body }: UseCreateApiNotesArgs) => {
      const { data, error } = await supabase.functions.invoke(`/notes`, {
        method: 'POST',
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
