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

export type UsePatchApiNoteNlpsIdArgs = {
  id: number
  body: ClinicalNoteNlpUpdate
}

export const usePatchApiNoteNlpsId = (
  args: UseMutationOptions<
    ClinicalNoteNlp,
    Error,
    UsePatchApiNoteNlpsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiNoteNlpsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/note-nlps/${id}`,
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
