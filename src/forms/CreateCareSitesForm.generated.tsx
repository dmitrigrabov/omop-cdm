import { healthsystemCareSiteCreate } from '@/types/healthsystemCareSiteCreate.generated.ts'
import { StringField } from '@/components/fields/string-field'
import { IntegerField } from '@/components/fields/integer-field'
import { useCreateApiCareSites } from '@/services/useCreateApiCareSites.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type CreateCareSitesFormBody = {
  care_site_name?: string | undefined
  place_of_service_concept_id?: number | undefined
  location_id?: number | undefined
  care_site_source_value?: string | undefined
  place_of_service_source_value?: string | undefined
}

export const CreateCareSitesFormFields = () => {
  return (
    <>
      <StringField fieldName={`care_site_name`} label="care_site_name" />
      <IntegerField fieldName={`place_of_service_concept_id`} />
      <IntegerField fieldName={`location_id`} />
      <StringField fieldName={`care_site_source_value`} label="care_site_source_value" />
      <StringField
        fieldName={`place_of_service_source_value`}
        label="place_of_service_source_value"
      />
    </>
  )
}

export type CreateCareSitesFormProps = {
  defaultValues: CreateCareSitesFormBody
  onSuccess: () => void
}

export type CreateCareSitesFormPathParams = Record<string, never>

export const CreateCareSitesForm = (props: CreateCareSitesFormProps) => {
  const form = useForm<CreateCareSitesFormBody>({
    resolver: zodResolver(healthsystemCareSiteCreate),
    defaultValues: props.defaultValues
  })

  const lens = useLens(form)

  const mutator = useCreateApiCareSites()

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
        <CreateCareSitesFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
