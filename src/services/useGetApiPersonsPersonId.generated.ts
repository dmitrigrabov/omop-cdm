import { clinicalPerson } from '@/types/clinicalPerson.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiPersonsPersonIdArgs = { person_id: number }

export const useGetApiPersonsPersonId = ({
  person_id,
}: UseGetApiPersonsPersonIdArgs) => {
  const result = useQuery({
    queryKey: ['Clinical - Persons', person_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/persons/${person_id}`,
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
