import { healthsystemLocationCreate } from '@/types/healthsystemLocationCreate.generated.ts'
import { StringField } from '@/components/fields/string-field'
import { IntegerField } from '@/components/fields/integer-field'
import { NumberField } from '@/components/fields/number-field'
import { useCreateApiLocations } from '@/services/useCreateApiLocations.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type CreateLocationsFormBody = {
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

export const CreateLocationsFormFields = () => {
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

export type CreateLocationsFormProps = {
  defaultValues: CreateLocationsFormBody
  onSuccess: () => void
}

export type CreateLocationsFormPathParams = Record<string, never>

export const CreateLocationsForm = (props: CreateLocationsFormProps) => {
  const form = useForm<CreateLocationsFormBody>({
    resolver: zodResolver(healthsystemLocationCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useCreateApiLocations()

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
        <CreateLocationsFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
