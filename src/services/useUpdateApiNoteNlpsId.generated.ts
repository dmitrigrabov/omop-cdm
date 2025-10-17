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

export type UseUpdateApiNoteNlpsIdArgs = {
  id: number
  body: ClinicalNoteNlpCreate
}

export const useUpdateApiNoteNlpsId = (
  args: UseMutationOptions<
    ClinicalNoteNlp,
    Error,
    UseUpdateApiNoteNlpsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UseUpdateApiNoteNlpsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/note-nlps/${id}`,
        {
          method: 'PUT',
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
