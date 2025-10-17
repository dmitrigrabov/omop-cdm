import { ClinicalPersonCreate } from '@/types/clinicalPersonCreate.generated.ts'
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

export type UseUpdateApiPersonsIdArgs = {
  id: number
  body: ClinicalPersonCreate
}

export const useUpdateApiPersonsId = (
  args: UseMutationOptions<
    ClinicalPerson,
    Error,
    UseUpdateApiPersonsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UseUpdateApiPersonsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/persons/${id}`,
        {
          method: 'PUT',
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
