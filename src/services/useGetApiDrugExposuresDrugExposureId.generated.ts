import { clinicalDrugExposure } from '@/types/clinicalDrugExposure.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiDrugExposuresDrugExposureIdArgs = {
  drug_exposure_id: number
}

export const useGetApiDrugExposuresDrugExposureId = ({
  drug_exposure_id,
}: UseGetApiDrugExposuresDrugExposureIdArgs) => {
  const result = useQuery({
    queryKey: ['Clinical - DrugExposures', drug_exposure_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/drug-exposures/${drug_exposure_id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return clinicalDrugExposure.parse(data)
    },
  })

  return result
}
