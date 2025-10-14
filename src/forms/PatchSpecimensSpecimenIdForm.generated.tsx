import { clinicalSpecimenUpdate } from '@/types/clinicalSpecimenUpdate.generated.ts'
import { usePatchApiSpecimensSpecimenId } from '@/services/usePatchApiSpecimensSpecimenId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchSpecimensSpecimenIdFormBody = {
  person_id?: number | undefined
  specimen_concept_id?: number | undefined
  specimen_type_concept_id?: number | undefined
  specimen_date?: string | undefined
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

export type PatchSpecimensSpecimenIdFormProps = {
  specimen_id: number
  defaultValues: PatchSpecimensSpecimenIdFormBody
  onSuccess: () => void
}

export type PatchSpecimensSpecimenIdFormPathParams = { specimen_id: number }

export const PatchSpecimensSpecimenIdForm = (
  props: PatchSpecimensSpecimenIdFormProps,
) => {
  const form = useForm<PatchSpecimensSpecimenIdFormBody>({
    resolver: zodResolver(clinicalSpecimenUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiSpecimensSpecimenId()

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
