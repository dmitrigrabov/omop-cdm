import { clinicalDeviceExposureUpdate } from '@/types/clinicalDeviceExposureUpdate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { usePatchApiDeviceExposuresId } from '@/services/usePatchApiDeviceExposuresId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchDeviceExposuresIdFormBody = {
  person_id?: number | undefined
  device_concept_id?: number | undefined
  device_exposure_start_date?: string | undefined
  device_exposure_start_datetime?: string | undefined
  device_exposure_end_date?: string | undefined
  device_exposure_end_datetime?: string | undefined
  device_type_concept_id?: number | undefined
  unique_device_id?: string | undefined
  production_id?: string | undefined
  quantity?: number | undefined
  provider_id?: number | undefined
  visit_occurrence_id?: number | undefined
  visit_detail_id?: number | undefined
  device_source_value?: string | undefined
  device_source_concept_id?: number | undefined
  unit_concept_id?: number | undefined
  unit_source_value?: string | undefined
  unit_source_concept_id?: number | undefined
}

export type PatchDeviceExposuresIdFormProps = {
  id: string
  defaultValues: Required<PatchDeviceExposuresIdFormBody>
  onSuccess: () => void
}

export type PatchDeviceExposuresIdFormPathParams = { id: string }

export const PatchDeviceExposuresIdForm = (
  props: PatchDeviceExposuresIdFormProps,
) => {
  const form = useForm<Required<PatchDeviceExposuresIdFormBody>>({
    resolver: zodResolver(clinicalDeviceExposureUpdate.required()),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiDeviceExposuresId()

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
          lens={lens.focus('device_concept_id')}
          label="device_concept_id"
        />
        <StringField
          lens={lens.focus('device_exposure_start_date')}
          label="device_exposure_start_date"
        />
        <StringField
          lens={lens.focus('device_exposure_start_datetime')}
          label="device_exposure_start_datetime"
        />
        <StringField
          lens={lens.focus('device_exposure_end_date')}
          label="device_exposure_end_date"
        />
        <StringField
          lens={lens.focus('device_exposure_end_datetime')}
          label="device_exposure_end_datetime"
        />
        <IntegerField
          lens={lens.focus('device_type_concept_id')}
          label="device_type_concept_id"
        />
        <StringField
          lens={lens.focus('unique_device_id')}
          label="unique_device_id"
        />
        <StringField lens={lens.focus('production_id')} label="production_id" />
        <IntegerField lens={lens.focus('quantity')} label="quantity" />
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
          lens={lens.focus('device_source_value')}
          label="device_source_value"
        />
        <IntegerField
          lens={lens.focus('device_source_concept_id')}
          label="device_source_concept_id"
        />
        <IntegerField
          lens={lens.focus('unit_concept_id')}
          label="unit_concept_id"
        />
        <StringField
          lens={lens.focus('unit_source_value')}
          label="unit_source_value"
        />
        <IntegerField
          lens={lens.focus('unit_source_concept_id')}
          label="unit_source_concept_id"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
