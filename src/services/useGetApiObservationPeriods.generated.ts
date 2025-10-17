import { clinicalObservationPeriod } from '@/types/clinicalObservationPeriod.generated.ts'
import { z } from 'zod'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export const useGetApiObservationPeriodsResponse = z.object({
  data: z.array(clinicalObservationPeriod),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type UseGetApiObservationPeriodsArgs = {
  offset?: number | undefined
  limit?: number | undefined
  person_id?: number | undefined
  period_type_concept_id?: CommonConceptId | undefined
  sort_by?: 'id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiObservationPeriods = ({
  offset,
  limit,
  person_id,
  period_type_concept_id,
  sort_by,
  sort_order,
}: UseGetApiObservationPeriodsArgs) => {
  const result = useQuery({
    queryKey: [
      'Clinical - ObservationPeriods',
      offset,
      limit,
      person_id,
      period_type_concept_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/observation-periods`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return useGetApiObservationPeriodsResponse.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
