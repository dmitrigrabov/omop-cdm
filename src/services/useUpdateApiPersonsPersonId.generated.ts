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
import { z } from 'zod'

export type UseUpdateApiPersonsPersonIdArgs = {
  person_id: number
  body: ClinicalPersonCreate
}

export const useUpdateApiPersonsPersonId = (
  args: UseMutationOptions<
    ClinicalPerson,
    Error,
    UseUpdateApiPersonsPersonIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      person_id,
      body,
    }: UseUpdateApiPersonsPersonIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/persons/${person_id}`,
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
