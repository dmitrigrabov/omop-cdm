import { ClinicalDrugExposureCreate } from '@/types/clinicalDrugExposureCreate.generated.ts'
import {
  clinicalDrugExposure,
  ClinicalDrugExposure,
} from '@/types/clinicalDrugExposure.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseUpdateApiDrugExposuresIdArgs = {
  id: number
  body: ClinicalDrugExposureCreate
}

export const useUpdateApiDrugExposuresId = (
  args: UseMutationOptions<
    ClinicalDrugExposure,
    Error,
    UseUpdateApiDrugExposuresIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UseUpdateApiDrugExposuresIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/drug-exposures/${id}`,
        {
          method: 'PUT',
          body,
        },
      )

      if (error) {
        throw error
      }

      return clinicalDrugExposure.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Clinical - DrugExposures'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
