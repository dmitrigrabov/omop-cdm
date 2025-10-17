import { clinicalSpecimen } from '@/types/clinicalSpecimen.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiSpecimensIdArgs = { id: string }

export const useGetApiSpecimensId = ({ id }: UseGetApiSpecimensIdArgs) => {
  const result = useQuery({
    queryKey: ['Clinical - Specimens', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/specimens/${id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return clinicalSpecimen.parse(data)
    },
  })

  return result
}
