import { clinicalDrugExposureUpdate } from '@/types/clinicalDrugExposureUpdate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { NumberField } from '@/components/fields/number-field'
import { usePatchApiDrugExposuresId } from '@/services/usePatchApiDrugExposuresId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchDrugExposuresIdFormBody = {
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

export const PatchDrugExposuresIdFormFields = () => {
  return (
    <>
      <IntegerField fieldName={`person_id`} />
      <IntegerField fieldName={`drug_concept_id`} />
      <StringField
        fieldName={`drug_exposure_start_date`}
        label="drug_exposure_start_date"
      />
      <StringField
        fieldName={`drug_exposure_start_datetime`}
        label="drug_exposure_start_datetime"
      />
      <StringField
        fieldName={`drug_exposure_end_date`}
        label="drug_exposure_end_date"
      />
      <StringField
        fieldName={`drug_exposure_end_datetime`}
        label="drug_exposure_end_datetime"
      />
      <StringField fieldName={`verbatim_end_date`} label="verbatim_end_date" />
      <IntegerField fieldName={`drug_type_concept_id`} />
      <StringField fieldName={`stop_reason`} label="stop_reason" />
      <IntegerField fieldName={`refills`} />
      <NumberField fieldName={`quantity`} />
      <IntegerField fieldName={`days_supply`} />
      <StringField fieldName={`sig`} label="sig" />
      <IntegerField fieldName={`route_concept_id`} />
      <StringField fieldName={`lot_number`} label="lot_number" />
      <IntegerField fieldName={`provider_id`} />
      <IntegerField fieldName={`visit_occurrence_id`} />
      <IntegerField fieldName={`visit_detail_id`} />
      <StringField fieldName={`drug_source_value`} label="drug_source_value" />
      <IntegerField fieldName={`drug_source_concept_id`} />
      <StringField
        fieldName={`route_source_value`}
        label="route_source_value"
      />
      <StringField
        fieldName={`dose_unit_source_value`}
        label="dose_unit_source_value"
      />
    </>
  )
}

export type PatchDrugExposuresIdFormProps = {
  id: number
  defaultValues: PatchDrugExposuresIdFormBody
  onSuccess: () => void
}

export type PatchDrugExposuresIdFormPathParams = { id: number }

export const PatchDrugExposuresIdForm = (
  props: PatchDrugExposuresIdFormProps,
) => {
  const form = useForm<PatchDrugExposuresIdFormBody>({
    resolver: zodResolver(clinicalDrugExposureUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiDrugExposuresId()

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
        <PatchDrugExposuresIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
