import { clinicalDrugExposureUpdate } from '@/types/clinicalDrugExposureUpdate.generated.ts'
import { usePatchApiDrugExposuresDrugExposureId } from '@/services/usePatchApiDrugExposuresDrugExposureId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchDrugExposuresDrugExposureIdFormBody = {
  person_id?: number | undefined
  drug_concept_id?: number | undefined
  drug_exposure_start_date?: string | undefined
  drug_exposure_start_datetime?: string | undefined
  drug_exposure_end_date?: string | undefined
  drug_exposure_end_datetime?: string | undefined
  verbatim_end_date?: string | undefined
  drug_type_concept_id?: number | undefined
  stop_reason?: string | undefined
  refills?: number | undefined
  quantity?: number | undefined
  days_supply?: number | undefined
  sig?: string | undefined
  route_concept_id?: number | undefined
  lot_number?: string | undefined
  provider_id?: number | undefined
  visit_occurrence_id?: number | undefined
  visit_detail_id?: number | undefined
  drug_source_value?: string | undefined
  drug_source_concept_id?: number | undefined
  route_source_value?: string | undefined
  dose_unit_source_value?: string | undefined
}

export type PatchDrugExposuresDrugExposureIdFormProps = {
  drug_exposure_id: number
  defaultValues: PatchDrugExposuresDrugExposureIdFormBody
  onSuccess: () => void
}

export type PatchDrugExposuresDrugExposureIdFormPathParams = {
  drug_exposure_id: number
}

export const PatchDrugExposuresDrugExposureIdForm = (
  props: PatchDrugExposuresDrugExposureIdFormProps,
) => {
  const form = useForm<PatchDrugExposuresDrugExposureIdFormBody>({
    resolver: zodResolver(clinicalDrugExposureUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiDrugExposuresDrugExposureId()

  useEffect(() => {
    if (mutator.isSuccess && props.onSuccess) {
      props.onSuccess()
    }
  }, [mutator.isSuccess])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((body, event) => {
          event?.preventDefault()

          mutator.mutate({ ...props, body })
        })}
        className="flex flex-col flex-1 gap-4 p-4"
      >
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
