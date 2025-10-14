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

export type UseCreateApiDrugErasArgs = { body: DerivedDrugEraCreate }

export const useCreateApiDrugEras = (
  args: UseMutationOptions<
    DerivedDrugEra,
    Error,
    UseCreateApiDrugErasArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ body }: UseCreateApiDrugErasArgs) => {
      const { data, error } = await supabase.functions.invoke(`/drug-eras`, {
        method: 'POST',
        body,
      })

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
