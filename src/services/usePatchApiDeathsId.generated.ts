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

export type UsePatchApiDeathsIdArgs = { id: string; body: ClinicalDeathUpdate }

export const usePatchApiDeathsId = (
  args: UseMutationOptions<
    ClinicalDeath,
    Error,
    UsePatchApiDeathsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiDeathsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(`/deaths/${id}`, {
        method: 'PATCH',
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
