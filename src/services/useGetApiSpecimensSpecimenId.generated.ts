import { clinicalSpecimen } from '@/types/clinicalSpecimen.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiSpecimensSpecimenIdArgs = { specimen_id: number }

export const useGetApiSpecimensSpecimenId = ({
  specimen_id,
}: UseGetApiSpecimensSpecimenIdArgs) => {
  const result = useQuery({
    queryKey: ['Clinical - Specimens', specimen_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/specimens/${specimen_id}`,
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
