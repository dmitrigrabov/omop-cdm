import { healthsystemLocationUpdate } from '@/types/healthsystemLocationUpdate.generated.ts'
import { StringField } from '@/components/fields/string-field'
import { IntegerField } from '@/components/fields/integer-field'
import { NumberField } from '@/components/fields/number-field'
import { usePatchApiLocationsId } from '@/services/usePatchApiLocationsId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchLocationsIdFormBody = {
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

export const PatchLocationsIdFormFields = () => {
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

export type PatchLocationsIdFormProps = {
  id: number
  defaultValues: PatchLocationsIdFormBody
  onSuccess: () => void
}

export type PatchLocationsIdFormPathParams = { id: number }

export const PatchLocationsIdForm = (props: PatchLocationsIdFormProps) => {
  const form = useForm<PatchLocationsIdFormBody>({
    resolver: zodResolver(healthsystemLocationUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiLocationsId()

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
        <PatchLocationsIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
