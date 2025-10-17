import { healthsystemProviderCreate } from '@/types/healthsystemProviderCreate.generated.ts'
import { StringField } from '@/components/fields/string-field'
import { IntegerField } from '@/components/fields/integer-field'
import { useUpdateApiProvidersId } from '@/services/useUpdateApiProvidersId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateProvidersIdFormBody = {
  provider_name?: string | undefined
  npi?: string | undefined
  dea?: string | undefined
  specialty_concept_id?: number | undefined
  care_site_id?: number | undefined
  year_of_birth?: number | undefined
  gender_concept_id?: number | undefined
  provider_source_value?: string | undefined
  specialty_source_value?: string | undefined
  specialty_source_concept_id?: number | undefined
  gender_source_value?: string | undefined
  gender_source_concept_id?: number | undefined
}

export const UpdateProvidersIdFormFields = () => {
  return (
    <>
      <StringField fieldName={`provider_name`} label="provider_name" />
      <StringField fieldName={`npi`} label="npi" />
      <StringField fieldName={`dea`} label="dea" />
      <IntegerField fieldName={`specialty_concept_id`} />
      <IntegerField fieldName={`care_site_id`} />
      <IntegerField fieldName={`year_of_birth`} />
      <IntegerField fieldName={`gender_concept_id`} />
      <StringField
        fieldName={`provider_source_value`}
        label="provider_source_value"
      />
      <StringField
        fieldName={`specialty_source_value`}
        label="specialty_source_value"
      />
      <IntegerField fieldName={`specialty_source_concept_id`} />
      <StringField
        fieldName={`gender_source_value`}
        label="gender_source_value"
      />
      <IntegerField fieldName={`gender_source_concept_id`} />
    </>
  )
}

export type UpdateProvidersIdFormProps = {
  id: number
  defaultValues: UpdateProvidersIdFormBody
  onSuccess: () => void
}

export type UpdateProvidersIdFormPathParams = { id: number }

export const UpdateProvidersIdForm = (props: UpdateProvidersIdFormProps) => {
  const form = useForm<UpdateProvidersIdFormBody>({
    resolver: zodResolver(healthsystemProviderCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiProvidersId()

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
        <UpdateProvidersIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
