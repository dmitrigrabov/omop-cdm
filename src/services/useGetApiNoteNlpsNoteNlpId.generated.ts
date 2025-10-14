import { clinicalNoteNlp } from '@/types/clinicalNoteNlp.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiNoteNlpsNoteNlpIdArgs = { note_nlp_id: number }

export const useGetApiNoteNlpsNoteNlpId = ({
  note_nlp_id,
}: UseGetApiNoteNlpsNoteNlpIdArgs) => {
  const result = useQuery({
    queryKey: ['Clinical - NoteNlps', note_nlp_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/note-nlps/${note_nlp_id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return clinicalNoteNlp.parse(data)
    },
  })

  return result
}
