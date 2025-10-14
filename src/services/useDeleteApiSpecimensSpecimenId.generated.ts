import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiSpecimensSpecimenIdArgs = { specimen_id: number }

export const useDeleteApiSpecimensSpecimenIdResponse = z.void()

export type UseDeleteApiSpecimensSpecimenIdResponse = void

export type DeleteApiSpecimensSpecimenIdBody = void

export const useDeleteApiSpecimensSpecimenId = (
  args: UseMutationOptions<
    UseDeleteApiSpecimensSpecimenIdResponse,
    Error,
    UseDeleteApiSpecimensSpecimenIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      specimen_id,
    }: UseDeleteApiSpecimensSpecimenIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/specimens/${specimen_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiSpecimensSpecimenIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ['Clinical - Specimens'] })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
