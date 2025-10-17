import { healthsystemCareSiteCreate } from '@/types/healthsystemCareSiteCreate.generated.ts'
import { StringField } from '@/components/fields/string-field'
import { IntegerField } from '@/components/fields/integer-field'
import { useUpdateApiCareSitesId } from '@/services/useUpdateApiCareSitesId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateCareSitesIdFormBody = {
  care_site_name?: string | undefined
  place_of_service_concept_id?: number | undefined
  location_id?: number | undefined
  care_site_source_value?: string | undefined
  place_of_service_source_value?: string | undefined
}

export type UpdateCareSitesIdFormProps = {
  id: string
  defaultValues: Required<UpdateCareSitesIdFormBody>
  onSuccess: () => void
}

export type UpdateCareSitesIdFormPathParams = { id: string }

export const UpdateCareSitesIdForm = (props: UpdateCareSitesIdFormProps) => {
  const form = useForm<Required<UpdateCareSitesIdFormBody>>({
    resolver: zodResolver(healthsystemCareSiteCreate.required()),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiCareSitesId()

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
        <StringField
          lens={lens.focus('care_site_name')}
          label="care_site_name"
        />
        <IntegerField
          lens={lens.focus('place_of_service_concept_id')}
          label="place_of_service_concept_id"
        />
        <IntegerField lens={lens.focus('location_id')} label="location_id" />
        <StringField
          lens={lens.focus('care_site_source_value')}
          label="care_site_source_value"
        />
        <StringField
          lens={lens.focus('place_of_service_source_value')}
          label="place_of_service_source_value"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
