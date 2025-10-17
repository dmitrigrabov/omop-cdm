import { healthsystemLocationCreate } from '@/types/healthsystemLocationCreate.generated.ts'
import { StringField } from '@/components/fields/string-field'
import { IntegerField } from '@/components/fields/integer-field'
import { NumberField } from '@/components/fields/number-field'
import { useUpdateApiLocationsId } from '@/services/useUpdateApiLocationsId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateLocationsIdFormBody = {
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

export const UpdateLocationsIdFormFields = () => {
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

export type UpdateLocationsIdFormProps = {
  id: number
  defaultValues: UpdateLocationsIdFormBody
  onSuccess: () => void
}

export type UpdateLocationsIdFormPathParams = { id: number }

export const UpdateLocationsIdForm = (props: UpdateLocationsIdFormProps) => {
  const form = useForm<UpdateLocationsIdFormBody>({
    resolver: zodResolver(healthsystemLocationCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiLocationsId()

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
        <UpdateLocationsIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
