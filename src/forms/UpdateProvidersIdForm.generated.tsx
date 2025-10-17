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

export type UpdateProvidersIdFormProps = {
  id: string
  defaultValues: Required<UpdateProvidersIdFormBody>
  onSuccess: () => void
}

export type UpdateProvidersIdFormPathParams = { id: string }

export const UpdateProvidersIdForm = (props: UpdateProvidersIdFormProps) => {
  const form = useForm<Required<UpdateProvidersIdFormBody>>({
    resolver: zodResolver(healthsystemProviderCreate.required()),
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
        <StringField lens={lens.focus('provider_name')} label="provider_name" />
        <StringField lens={lens.focus('npi')} label="npi" />
        <StringField lens={lens.focus('dea')} label="dea" />
        <IntegerField
          lens={lens.focus('specialty_concept_id')}
          label="specialty_concept_id"
        />
        <IntegerField lens={lens.focus('care_site_id')} label="care_site_id" />
        <IntegerField
          lens={lens.focus('year_of_birth')}
          label="year_of_birth"
        />
        <IntegerField
          lens={lens.focus('gender_concept_id')}
          label="gender_concept_id"
        />
        <StringField
          lens={lens.focus('provider_source_value')}
          label="provider_source_value"
        />
        <StringField
          lens={lens.focus('specialty_source_value')}
          label="specialty_source_value"
        />
        <IntegerField
          lens={lens.focus('specialty_source_concept_id')}
          label="specialty_source_concept_id"
        />
        <StringField
          lens={lens.focus('gender_source_value')}
          label="gender_source_value"
        />
        <IntegerField
          lens={lens.focus('gender_source_concept_id')}
          label="gender_source_concept_id"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
