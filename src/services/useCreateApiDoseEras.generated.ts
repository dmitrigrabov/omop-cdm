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
import { z } from 'zod'

export type UseCreateApiDoseErasArgs = { body: DerivedDoseEraCreate }

export const useCreateApiDoseEras = (
  args: UseMutationOptions<
    DerivedDoseEra,
    Error,
    UseCreateApiDoseErasArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ body }: UseCreateApiDoseErasArgs) => {
      const { data, error } = await supabase.functions.invoke(`/dose-eras`, {
        method: 'POST',
        body,
      })

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
