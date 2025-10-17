import { clinicalPerson } from '@/types/clinicalPerson.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiPersonsIdArgs = { id: number }

export const useGetApiPersonsId = ({ id }: UseGetApiPersonsIdArgs) => {
  const result = useQuery({
    queryKey: ['Clinical - Persons', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/persons/${id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return clinicalPerson.parse(data)
    },
  })

  return result
}
