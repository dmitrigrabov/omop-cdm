import { ClinicalPersonUpdate } from '@/types/clinicalPersonUpdate.generated.ts'
import {
  clinicalPerson,
  ClinicalPerson,
} from '@/types/clinicalPerson.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UsePatchApiPersonsIdArgs = {
  id: string
  body: ClinicalPersonUpdate
}

export const usePatchApiPersonsId = (
  args: UseMutationOptions<
    ClinicalPerson,
    Error,
    UsePatchApiPersonsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiPersonsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/persons/${id}`,
        {
          method: 'PATCH',
          body,
        },
      )

      if (error) {
        throw error
      }

      return clinicalPerson.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ['Clinical - Persons'] })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
