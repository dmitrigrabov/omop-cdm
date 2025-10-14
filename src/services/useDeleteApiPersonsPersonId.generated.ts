import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiPersonsPersonIdArgs = { person_id: number }

export const useDeleteApiPersonsPersonIdResponse = z.void()

export type UseDeleteApiPersonsPersonIdResponse = void

export type DeleteApiPersonsPersonIdBody = void

export const useDeleteApiPersonsPersonId = (
  args: UseMutationOptions<
    UseDeleteApiPersonsPersonIdResponse,
    Error,
    UseDeleteApiPersonsPersonIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ person_id }: UseDeleteApiPersonsPersonIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/persons/${person_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiPersonsPersonIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ['Clinical - Persons'] })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
