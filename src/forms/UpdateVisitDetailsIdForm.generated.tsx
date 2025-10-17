import { clinicalVisitDetailCreate } from '@/types/clinicalVisitDetailCreate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { useUpdateApiVisitDetailsId } from '@/services/useUpdateApiVisitDetailsId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateVisitDetailsIdFormBody = {
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

export type UpdateVisitDetailsIdFormProps = {
  id: string
  defaultValues: Required<UpdateVisitDetailsIdFormBody>
  onSuccess: () => void
}

export type UpdateVisitDetailsIdFormPathParams = { id: string }

export const UpdateVisitDetailsIdForm = (
  props: UpdateVisitDetailsIdFormProps,
) => {
  const form = useForm<Required<UpdateVisitDetailsIdFormBody>>({
    resolver: zodResolver(clinicalVisitDetailCreate.required()),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiVisitDetailsId()

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
        <IntegerField lens={lens.focus('person_id')} label="person_id" />
        <IntegerField
          lens={lens.focus('visit_detail_concept_id')}
          label="visit_detail_concept_id"
        />
        <StringField
          lens={lens.focus('visit_detail_start_date')}
          label="visit_detail_start_date"
        />
        <StringField
          lens={lens.focus('visit_detail_start_datetime')}
          label="visit_detail_start_datetime"
        />
        <StringField
          lens={lens.focus('visit_detail_end_date')}
          label="visit_detail_end_date"
        />
        <StringField
          lens={lens.focus('visit_detail_end_datetime')}
          label="visit_detail_end_datetime"
        />
        <IntegerField
          lens={lens.focus('visit_detail_type_concept_id')}
          label="visit_detail_type_concept_id"
        />
        <IntegerField lens={lens.focus('provider_id')} label="provider_id" />
        <IntegerField lens={lens.focus('care_site_id')} label="care_site_id" />
        <StringField
          lens={lens.focus('visit_detail_source_value')}
          label="visit_detail_source_value"
        />
        <IntegerField
          lens={lens.focus('visit_detail_source_concept_id')}
          label="visit_detail_source_concept_id"
        />
        <IntegerField
          lens={lens.focus('admitted_from_concept_id')}
          label="admitted_from_concept_id"
        />
        <StringField
          lens={lens.focus('admitted_from_source_value')}
          label="admitted_from_source_value"
        />
        <StringField
          lens={lens.focus('discharged_to_source_value')}
          label="discharged_to_source_value"
        />
        <IntegerField
          lens={lens.focus('discharged_to_concept_id')}
          label="discharged_to_concept_id"
        />
        <IntegerField
          lens={lens.focus('preceding_visit_detail_id')}
          label="preceding_visit_detail_id"
        />
        <IntegerField
          lens={lens.focus('parent_visit_detail_id')}
          label="parent_visit_detail_id"
        />
        <IntegerField
          lens={lens.focus('visit_occurrence_id')}
          label="visit_occurrence_id"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
