import { DerivedDrugEraUpdate } from '@/types/derivedDrugEraUpdate.generated.ts'
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

export type UsePatchApiDrugErasIdArgs = {
  id: string
  body: DerivedDrugEraUpdate
}

export const usePatchApiDrugErasId = (
  args: UseMutationOptions<
    DerivedDrugEra,
    Error,
    UsePatchApiDrugErasIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiDrugErasIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/drug-eras/${id}`,
        {
          method: 'PATCH',
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
