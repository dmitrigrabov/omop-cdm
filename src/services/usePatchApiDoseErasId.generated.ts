import { DerivedDoseEraUpdate } from '@/types/derivedDoseEraUpdate.generated.ts'
import {
  derivedDoseEra,
  DerivedDoseEra,
} from '@/types/derivedDoseEra.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UsePatchApiDoseErasIdArgs = {
  id: string
  body: DerivedDoseEraUpdate
}

export const usePatchApiDoseErasId = (
  args: UseMutationOptions<
    DerivedDoseEra,
    Error,
    UsePatchApiDoseErasIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiDoseErasIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/dose-eras/${id}`,
        {
          method: 'PATCH',
          body,
        },
      )

      if (error) {
        throw error
      }

      return derivedDoseEra.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ['Derived - DoseEras'] })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
