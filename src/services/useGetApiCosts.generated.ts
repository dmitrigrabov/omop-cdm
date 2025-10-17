import { healthsystemCostList } from '@/types/healthsystemCostList.generated.ts'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export type UseGetApiCostsArgs = {
  offset?: number | undefined
  limit?: number | undefined
  cost_domain_id?: string | undefined
  cost_type_concept_id?: CommonConceptId | undefined
  currency_concept_id?: CommonConceptId | undefined
  revenue_code_concept_id?: CommonConceptId | undefined
  drg_concept_id?: CommonConceptId | undefined
  sort_by?: 'id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiCosts = ({
  offset,
  limit,
  cost_domain_id,
  cost_type_concept_id,
  currency_concept_id,
  revenue_code_concept_id,
  drg_concept_id,
  sort_by,
  sort_order,
}: UseGetApiCostsArgs) => {
  const result = useQuery({
    queryKey: [
      'Health System - Costs',
      offset,
      limit,
      cost_domain_id,
      cost_type_concept_id,
      currency_concept_id,
      revenue_code_concept_id,
      drg_concept_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(`/costs`, {
        method: 'GET',
      })

      if (error) {
        throw error
      }

      return healthsystemCostList.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
