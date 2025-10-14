import { healthsystemCareSiteCreate } from '@/types/healthsystemCareSiteCreate.generated.ts'
import { useUpdateApiCareSitesCareSiteId } from '@/services/useUpdateApiCareSitesCareSiteId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateCareSitesCareSiteIdFormBody = {
  care_site_name?: string | undefined
  place_of_service_concept_id?: number | undefined
  location_id?: number | undefined
  care_site_source_value?: string | undefined
  place_of_service_source_value?: string | undefined
}

export type UpdateCareSitesCareSiteIdFormProps = {
  care_site_id: number
  defaultValues: UpdateCareSitesCareSiteIdFormBody
  onSuccess: () => void
}

export type UpdateCareSitesCareSiteIdFormPathParams = { care_site_id: number }

export const UpdateCareSitesCareSiteIdForm = (
  props: UpdateCareSitesCareSiteIdFormProps,
) => {
  const form = useForm<UpdateCareSitesCareSiteIdFormBody>({
    resolver: zodResolver(healthsystemCareSiteCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiCareSitesCareSiteId()

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
