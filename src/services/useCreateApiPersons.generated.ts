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

export type UseCreateApiPersonsArgs = { body: ClinicalPersonCreate }

export const useCreateApiPersons = (
  args: UseMutationOptions<
    ClinicalPerson,
    Error,
    UseCreateApiPersonsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ body }: UseCreateApiPersonsArgs) => {
      const { data, error } = await supabase.functions.invoke(`/persons`, {
        method: 'POST',
        body,
      })

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
