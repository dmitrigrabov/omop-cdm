import { healthsystemProviderCreate } from '@/types/healthsystemProviderCreate.generated.ts'
import { useCreateApiProviders } from '@/services/useCreateApiProviders.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type CreateProvidersFormBody = {
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

export type CreateProvidersFormProps = {
  defaultValues: CreateProvidersFormBody
  onSuccess: () => void
}

export type CreateProvidersFormPathParams = Record<string, never>

export const CreateProvidersForm = (props: CreateProvidersFormProps) => {
  const form = useForm<CreateProvidersFormBody>({
    resolver: zodResolver(healthsystemProviderCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useCreateApiProviders()

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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
