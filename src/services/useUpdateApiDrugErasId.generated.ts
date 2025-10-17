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

export type UseUpdateApiDrugErasIdArgs = {
  id: number
  body: DerivedDrugEraCreate
}

export const useUpdateApiDrugErasId = (
  args: UseMutationOptions<
    DerivedDrugEra,
    Error,
    UseUpdateApiDrugErasIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UseUpdateApiDrugErasIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/drug-eras/${id}`,
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
