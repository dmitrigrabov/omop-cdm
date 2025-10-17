import { clinicalDeviceExposureCreate } from '@/types/clinicalDeviceExposureCreate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { useCreateApiDeviceExposures } from '@/services/useCreateApiDeviceExposures.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type CreateDeviceExposuresFormBody = {
  person_id: number
  device_concept_id: number
  device_exposure_start_date: string
  device_exposure_start_datetime?: string | undefined
  device_exposure_end_date?: string | undefined
  device_exposure_end_datetime?: string | undefined
  device_type_concept_id: number
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

export const CreateDeviceExposuresFormFields = () => {
  return (
    <>
      <IntegerField fieldName={`person_id`} />
      <IntegerField fieldName={`device_concept_id`} />
      <StringField
        fieldName={`device_exposure_start_date`}
        label="device_exposure_start_date"
      />
      <StringField
        fieldName={`device_exposure_start_datetime`}
        label="device_exposure_start_datetime"
      />
      <StringField
        fieldName={`device_exposure_end_date`}
        label="device_exposure_end_date"
      />
      <StringField
        fieldName={`device_exposure_end_datetime`}
        label="device_exposure_end_datetime"
      />
      <IntegerField fieldName={`device_type_concept_id`} />
      <StringField fieldName={`unique_device_id`} label="unique_device_id" />
      <StringField fieldName={`production_id`} label="production_id" />
      <IntegerField fieldName={`quantity`} />
      <IntegerField fieldName={`provider_id`} />
      <IntegerField fieldName={`visit_occurrence_id`} />
      <IntegerField fieldName={`visit_detail_id`} />
      <StringField
        fieldName={`device_source_value`}
        label="device_source_value"
      />
      <IntegerField fieldName={`device_source_concept_id`} />
      <IntegerField fieldName={`unit_concept_id`} />
      <StringField fieldName={`unit_source_value`} label="unit_source_value" />
      <IntegerField fieldName={`unit_source_concept_id`} />
    </>
  )
}

export type CreateDeviceExposuresFormProps = {
  defaultValues: CreateDeviceExposuresFormBody
  onSuccess: () => void
}

export type CreateDeviceExposuresFormPathParams = Record<string, never>

export const CreateDeviceExposuresForm = (
  props: CreateDeviceExposuresFormProps,
) => {
  const form = useForm<CreateDeviceExposuresFormBody>({
    resolver: zodResolver(clinicalDeviceExposureCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useCreateApiDeviceExposures()

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
        <CreateDeviceExposuresFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
