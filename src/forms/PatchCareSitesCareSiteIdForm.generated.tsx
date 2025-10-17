import { healthsystemCareSiteUpdate } from '@/types/healthsystemCareSiteUpdate.generated.ts'
import { StringField } from '@/components/fields/string-field'
import { IntegerField } from '@/components/fields/integer-field'
import { usePatchApiCareSitesCareSiteId } from '@/services/usePatchApiCareSitesCareSiteId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchCareSitesCareSiteIdFormBody = {
  care_site_name?: string | undefined
  place_of_service_concept_id?: number | undefined
  location_id?: number | undefined
  care_site_source_value?: string | undefined
  place_of_service_source_value?: string | undefined
}

export const PatchCareSitesCareSiteIdFormFields = () => {
  return (
    <>
      <StringField fieldName={`care_site_name`} label="care_site_name" />
      <IntegerField fieldName={`place_of_service_concept_id`} />
      <IntegerField fieldName={`location_id`} />
      <StringField
        fieldName={`care_site_source_value`}
        label="care_site_source_value"
      />
      <StringField
        fieldName={`place_of_service_source_value`}
        label="place_of_service_source_value"
      />
    </>
  )
}

export type PatchCareSitesCareSiteIdFormProps = {
  care_site_id: number
  defaultValues: PatchCareSitesCareSiteIdFormBody
  onSuccess: () => void
}

export type PatchCareSitesCareSiteIdFormPathParams = { care_site_id: number }

export const PatchCareSitesCareSiteIdForm = (
  props: PatchCareSitesCareSiteIdFormProps,
) => {
  const form = useForm<PatchCareSitesCareSiteIdFormBody>({
    resolver: zodResolver(healthsystemCareSiteUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiCareSitesCareSiteId()

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
        <PatchCareSitesCareSiteIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
