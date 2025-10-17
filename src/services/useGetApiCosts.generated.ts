import { healthsystemCost } from '@/types/healthsystemCost.generated.ts'
import { z } from 'zod'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export const useGetApiCostsResponse = z.object({
  data: z.array(healthsystemCost),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

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

      return useGetApiCostsResponse.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
