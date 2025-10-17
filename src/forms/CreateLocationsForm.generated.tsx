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

export type CreateLocationsFormProps = {
  defaultValues: Required<CreateLocationsFormBody>
  onSuccess: () => void
}

export type CreateLocationsFormPathParams = Record<string, never>

export const CreateLocationsForm = (props: CreateLocationsFormProps) => {
  const form = useForm<Required<CreateLocationsFormBody>>({
    resolver: zodResolver(healthsystemLocationCreate.required()),
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
        <StringField lens={lens.focus('city')} label="city" />
        <StringField lens={lens.focus('state')} label="state" />
        <StringField lens={lens.focus('zip')} label="zip" />
        <StringField lens={lens.focus('county')} label="county" />
        <StringField
          lens={lens.focus('location_source_value')}
          label="location_source_value"
        />
        <IntegerField
          lens={lens.focus('country_concept_id')}
          label="country_concept_id"
        />
        <StringField
          lens={lens.focus('country_source_value')}
          label="country_source_value"
        />
        <NumberField lens={lens.focus('latitude')} />
        <NumberField lens={lens.focus('longitude')} />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
