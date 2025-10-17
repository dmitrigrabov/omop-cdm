import { healthsystemPayerPlanPeriodList } from '@/types/healthsystemPayerPlanPeriodList.generated.ts'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export type UseGetApiPayerPlanPeriodsArgs = {
  offset?: number | undefined
  limit?: number | undefined
  person_id?: number | undefined
  payer_concept_id?: CommonConceptId | undefined
  payer_source_concept_id?: CommonConceptId | undefined
  plan_concept_id?: CommonConceptId | undefined
  plan_source_concept_id?: CommonConceptId | undefined
  sponsor_concept_id?: CommonConceptId | undefined
  sponsor_source_concept_id?: CommonConceptId | undefined
  stop_reason_concept_id?: CommonConceptId | undefined
  stop_reason_source_concept_id?: CommonConceptId | undefined
  sort_by?: 'id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiPayerPlanPeriods = ({
  offset,
  limit,
  person_id,
  payer_concept_id,
  payer_source_concept_id,
  plan_concept_id,
  plan_source_concept_id,
  sponsor_concept_id,
  sponsor_source_concept_id,
  stop_reason_concept_id,
  stop_reason_source_concept_id,
  sort_by,
  sort_order,
}: UseGetApiPayerPlanPeriodsArgs) => {
  const result = useQuery({
    queryKey: [
      'Health System - PayerPlanPeriods',
      offset,
      limit,
      person_id,
      payer_concept_id,
      payer_source_concept_id,
      plan_concept_id,
      plan_source_concept_id,
      sponsor_concept_id,
      sponsor_source_concept_id,
      stop_reason_concept_id,
      stop_reason_source_concept_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/payer-plan-periods`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return healthsystemPayerPlanPeriodList.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
