import { ClinicalDeathUpdate } from '@/types/clinicalDeathUpdate.generated.ts'
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

export type UsePatchApiDeathsDeathIdArgs = {
  death_id: number
  body: ClinicalDeathUpdate
}

export const usePatchApiDeathsDeathId = (
  args: UseMutationOptions<
    ClinicalDeath,
    Error,
    UsePatchApiDeathsDeathIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ death_id, body }: UsePatchApiDeathsDeathIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/deaths/${death_id}`,
        {
          method: 'PATCH',
          body,
        },
      )

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
