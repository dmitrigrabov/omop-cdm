import { ClinicalDeathCreate } from '@/types/clinicalDeathCreate.generated.ts'
import {
  clinicalDeath,
  ClinicalDeath,
} from '@/types/clinicalDeath.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'
import { z } from 'zod'

export type UseCreateApiDeathsArgs = { body: ClinicalDeathCreate }

export const useCreateApiDeaths = (
  args: UseMutationOptions<
    ClinicalDeath,
    Error,
    UseCreateApiDeathsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ body }: UseCreateApiDeathsArgs) => {
      const { data, error } = await supabase.functions.invoke(`/deaths`, {
        method: 'POST',
        body,
      })

      if (error) {
        throw error
      }

      return clinicalDeath.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ['Clinical - Deaths'] })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
