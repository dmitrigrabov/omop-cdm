import { clinicalSpecimenCreate } from '@/types/clinicalSpecimenCreate.generated.ts'
import { useUpdateApiSpecimensSpecimenId } from '@/services/useUpdateApiSpecimensSpecimenId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateSpecimensSpecimenIdFormBody = {
  person_id: number
  specimen_concept_id: number
  specimen_type_concept_id: number
  specimen_date: string
  specimen_datetime?: string | undefined
  quantity?: number | undefined
  unit_concept_id?: number | undefined
  anatomic_site_concept_id?: number | undefined
  disease_status_concept_id?: number | undefined
  specimen_source_id?: string | undefined
  specimen_source_value?: string | undefined
  unit_source_value?: string | undefined
  anatomic_site_source_value?: string | undefined
  disease_status_source_value?: string | undefined
}

export type UpdateSpecimensSpecimenIdFormProps = {
  specimen_id: number
  defaultValues: UpdateSpecimensSpecimenIdFormBody
  onSuccess: () => void
}

export type UpdateSpecimensSpecimenIdFormPathParams = { specimen_id: number }

export const UpdateSpecimensSpecimenIdForm = (
  props: UpdateSpecimensSpecimenIdFormProps,
) => {
  const form = useForm<UpdateSpecimensSpecimenIdFormBody>({
    resolver: zodResolver(clinicalSpecimenCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiSpecimensSpecimenId()

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
