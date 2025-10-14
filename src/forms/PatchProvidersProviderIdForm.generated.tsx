import { healthsystemProviderUpdate } from '@/types/healthsystemProviderUpdate.generated.ts'
import { usePatchApiProvidersProviderId } from '@/services/usePatchApiProvidersProviderId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchProvidersProviderIdFormBody = {
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

export type PatchProvidersProviderIdFormProps = {
  provider_id: number
  defaultValues: PatchProvidersProviderIdFormBody
  onSuccess: () => void
}

export type PatchProvidersProviderIdFormPathParams = { provider_id: number }

export const PatchProvidersProviderIdForm = (
  props: PatchProvidersProviderIdFormProps,
) => {
  const form = useForm<PatchProvidersProviderIdFormBody>({
    resolver: zodResolver(healthsystemProviderUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiProvidersProviderId()

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
