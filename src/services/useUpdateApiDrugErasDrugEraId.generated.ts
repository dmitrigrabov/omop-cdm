import { DerivedDrugEraCreate } from '@/types/derivedDrugEraCreate.generated.ts'
import {
  derivedDrugEra,
  DerivedDrugEra,
} from '@/types/derivedDrugEra.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'
import { z } from 'zod'

export type UseUpdateApiDrugErasDrugEraIdArgs = {
  drug_era_id: number
  body: DerivedDrugEraCreate
}

export const useUpdateApiDrugErasDrugEraId = (
  args: UseMutationOptions<
    DerivedDrugEra,
    Error,
    UseUpdateApiDrugErasDrugEraIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      drug_era_id,
      body,
    }: UseUpdateApiDrugErasDrugEraIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/drug-eras/${drug_era_id}`,
        {
          method: 'PUT',
          body,
        },
      )

      if (error) {
        throw error
      }

      return derivedDrugEra.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ['Derived - DrugEras'] })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
