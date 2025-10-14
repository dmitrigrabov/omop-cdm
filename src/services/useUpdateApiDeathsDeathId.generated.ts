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

export type UseUpdateApiDeathsDeathIdArgs = {
  death_id: number
  body: ClinicalDeathCreate
}

export const useUpdateApiDeathsDeathId = (
  args: UseMutationOptions<
    ClinicalDeath,
    Error,
    UseUpdateApiDeathsDeathIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ death_id, body }: UseUpdateApiDeathsDeathIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/deaths/${death_id}`,
        {
          method: 'PUT',
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
