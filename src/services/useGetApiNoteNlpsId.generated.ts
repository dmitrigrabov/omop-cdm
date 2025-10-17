import { clinicalNoteNlp } from '@/types/clinicalNoteNlp.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiNoteNlpsIdArgs = { id: number }

export const useGetApiNoteNlpsId = ({ id }: UseGetApiNoteNlpsIdArgs) => {
  const result = useQuery({
    queryKey: ['Clinical - NoteNlps', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/note-nlps/${id}`,
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
