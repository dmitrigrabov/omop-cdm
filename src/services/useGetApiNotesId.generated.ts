import { clinicalNote } from '@/types/clinicalNote.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiNotesIdArgs = { id: number }

export const useGetApiNotesId = ({ id }: UseGetApiNotesIdArgs) => {
  const result = useQuery({
    queryKey: ['Clinical - Notes', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(`/notes/${id}`, {
        method: 'GET',
      })

      if (error) {
        throw error
      }

      return clinicalNote.parse(data)
    },
  })

  return result
}
