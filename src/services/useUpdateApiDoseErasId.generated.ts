import { DerivedDoseEraCreate } from '@/types/derivedDoseEraCreate.generated.ts'
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

export type UseUpdateApiDoseErasIdArgs = {
  id: number
  body: DerivedDoseEraCreate
}

export const useUpdateApiDoseErasId = (
  args: UseMutationOptions<
    DerivedDoseEra,
    Error,
    UseUpdateApiDoseErasIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UseUpdateApiDoseErasIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/dose-eras/${id}`,
        {
          method: 'PUT',
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
