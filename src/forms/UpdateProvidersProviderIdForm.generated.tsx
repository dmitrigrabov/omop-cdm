import { healthsystemProviderCreate } from '@/types/healthsystemProviderCreate.generated.ts'
import { useUpdateApiProvidersProviderId } from '@/services/useUpdateApiProvidersProviderId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateProvidersProviderIdFormBody = {
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

export type UpdateProvidersProviderIdFormProps = {
  provider_id: number
  defaultValues: UpdateProvidersProviderIdFormBody
  onSuccess: () => void
}

export type UpdateProvidersProviderIdFormPathParams = { provider_id: number }

export const UpdateProvidersProviderIdForm = (
  props: UpdateProvidersProviderIdFormProps,
) => {
  const form = useForm<UpdateProvidersProviderIdFormBody>({
    resolver: zodResolver(healthsystemProviderCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiProvidersProviderId()

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
