import { clinicalVisitDetailCreate } from '@/types/clinicalVisitDetailCreate.generated.ts'
import { useUpdateApiVisitDetailsVisitDetailId } from '@/services/useUpdateApiVisitDetailsVisitDetailId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateVisitDetailsVisitDetailIdFormBody = {
  person_id: number
  visit_detail_concept_id: number
  visit_detail_start_date: string
  visit_detail_start_datetime?: string | undefined
  visit_detail_end_date: string
  visit_detail_end_datetime?: string | undefined
  visit_detail_type_concept_id: number
  provider_id?: number | undefined
  care_site_id?: number | undefined
  visit_detail_source_value?: string | undefined
  visit_detail_source_concept_id?: number | undefined
  admitted_from_concept_id?: number | undefined
  admitted_from_source_value?: string | undefined
  discharged_to_source_value?: string | undefined
  discharged_to_concept_id?: number | undefined
  preceding_visit_detail_id?: number | undefined
  parent_visit_detail_id?: number | undefined
  visit_occurrence_id: number
}

export type UpdateVisitDetailsVisitDetailIdFormProps = {
  visit_detail_id: number
  defaultValues: UpdateVisitDetailsVisitDetailIdFormBody
  onSuccess: () => void
}

export type UpdateVisitDetailsVisitDetailIdFormPathParams = {
  visit_detail_id: number
}

export const UpdateVisitDetailsVisitDetailIdForm = (
  props: UpdateVisitDetailsVisitDetailIdFormProps,
) => {
  const form = useForm<UpdateVisitDetailsVisitDetailIdFormBody>({
    resolver: zodResolver(clinicalVisitDetailCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiVisitDetailsVisitDetailId()

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
