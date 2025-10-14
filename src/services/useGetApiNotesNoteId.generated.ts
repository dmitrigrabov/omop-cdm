import { clinicalNote } from '@/types/clinicalNote.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiNotesNoteIdArgs = { note_id: number }

export const useGetApiNotesNoteId = ({ note_id }: UseGetApiNotesNoteIdArgs) => {
  const result = useQuery({
    queryKey: ['Clinical - Notes', note_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/notes/${note_id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return clinicalNote.parse(data)
    },
  })

  return result
}
