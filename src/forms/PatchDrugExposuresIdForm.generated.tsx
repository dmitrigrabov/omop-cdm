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

export type PatchDrugExposuresIdFormProps = {
  id: string
  defaultValues: Required<PatchDrugExposuresIdFormBody>
  onSuccess: () => void
}

export type PatchDrugExposuresIdFormPathParams = { id: string }

export const PatchDrugExposuresIdForm = (
  props: PatchDrugExposuresIdFormProps,
) => {
  const form = useForm<Required<PatchDrugExposuresIdFormBody>>({
    resolver: zodResolver(clinicalDrugExposureUpdate.required()),
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
        <IntegerField lens={lens.focus('person_id')} label="person_id" />
        <IntegerField
          lens={lens.focus('drug_concept_id')}
          label="drug_concept_id"
        />
        <StringField
          lens={lens.focus('drug_exposure_start_date')}
          label="drug_exposure_start_date"
        />
        <StringField
          lens={lens.focus('drug_exposure_start_datetime')}
          label="drug_exposure_start_datetime"
        />
        <StringField
          lens={lens.focus('drug_exposure_end_date')}
          label="drug_exposure_end_date"
        />
        <StringField
          lens={lens.focus('drug_exposure_end_datetime')}
          label="drug_exposure_end_datetime"
        />
        <StringField
          lens={lens.focus('verbatim_end_date')}
          label="verbatim_end_date"
        />
        <IntegerField
          lens={lens.focus('drug_type_concept_id')}
          label="drug_type_concept_id"
        />
        <StringField lens={lens.focus('stop_reason')} label="stop_reason" />
        <IntegerField lens={lens.focus('refills')} label="refills" />
        <NumberField lens={lens.focus('quantity')} />
        <IntegerField lens={lens.focus('days_supply')} label="days_supply" />
        <StringField lens={lens.focus('sig')} label="sig" />
        <IntegerField
          lens={lens.focus('route_concept_id')}
          label="route_concept_id"
        />
        <StringField lens={lens.focus('lot_number')} label="lot_number" />
        <IntegerField lens={lens.focus('provider_id')} label="provider_id" />
        <IntegerField
          lens={lens.focus('visit_occurrence_id')}
          label="visit_occurrence_id"
        />
        <IntegerField
          lens={lens.focus('visit_detail_id')}
          label="visit_detail_id"
        />
        <StringField
          lens={lens.focus('drug_source_value')}
          label="drug_source_value"
        />
        <IntegerField
          lens={lens.focus('drug_source_concept_id')}
          label="drug_source_concept_id"
        />
        <StringField
          lens={lens.focus('route_source_value')}
          label="route_source_value"
        />
        <StringField
          lens={lens.focus('dose_unit_source_value')}
          label="dose_unit_source_value"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
