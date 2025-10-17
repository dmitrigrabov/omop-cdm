import { healthsystemLocationCreate } from '@/types/healthsystemLocationCreate.generated.ts'
import { StringField } from '@/components/fields/string-field'
import { IntegerField } from '@/components/fields/integer-field'
import { NumberField } from '@/components/fields/number-field'
import { useUpdateApiLocationsLocationId } from '@/services/useUpdateApiLocationsLocationId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateLocationsLocationIdFormBody = {
  city?: string | undefined
  state?: string | undefined
  zip?: string | undefined
  county?: string | undefined
  location_source_value?: string | undefined
  country_concept_id?: number | undefined
  country_source_value?: string | undefined
  latitude?: number | undefined
  longitude?: number | undefined
}

export const UpdateLocationsLocationIdFormFields = () => {
  return (
    <>
      <StringField fieldName={`city`} label="city" />
      <StringField fieldName={`state`} label="state" />
      <StringField fieldName={`zip`} label="zip" />
      <StringField fieldName={`county`} label="county" />
      <StringField
        fieldName={`location_source_value`}
        label="location_source_value"
      />
      <IntegerField fieldName={`country_concept_id`} />
      <StringField
        fieldName={`country_source_value`}
        label="country_source_value"
      />
      <NumberField fieldName={`latitude`} />
      <NumberField fieldName={`longitude`} />
    </>
  )
}

export type UpdateLocationsLocationIdFormProps = {
  location_id: number
  defaultValues: UpdateLocationsLocationIdFormBody
  onSuccess: () => void
}

export type UpdateLocationsLocationIdFormPathParams = { location_id: number }

export const UpdateLocationsLocationIdForm = (
  props: UpdateLocationsLocationIdFormProps,
) => {
  const form = useForm<UpdateLocationsLocationIdFormBody>({
    resolver: zodResolver(healthsystemLocationCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiLocationsLocationId()

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
        <UpdateLocationsLocationIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
