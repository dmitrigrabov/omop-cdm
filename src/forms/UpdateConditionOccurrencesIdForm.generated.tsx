import { clinicalConditionOccurrenceCreate } from '@/types/clinicalConditionOccurrenceCreate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { useUpdateApiConditionOccurrencesId } from '@/services/useUpdateApiConditionOccurrencesId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateConditionOccurrencesIdFormBody = {
  person_id: number
  condition_concept_id: number
  condition_start_date: string
  condition_start_datetime?: string | undefined
  condition_end_date?: string | undefined
  condition_end_datetime?: string | undefined
  condition_type_concept_id: number
  condition_status_concept_id?: number | undefined
  stop_reason?: string | undefined
  provider_id?: number | undefined
  visit_occurrence_id?: number | undefined
  visit_detail_id?: number | undefined
  condition_source_value?: string | undefined
  condition_source_concept_id?: number | undefined
  condition_status_source_value?: string | undefined
}

export type UpdateConditionOccurrencesIdFormProps = {
  id: string
  defaultValues: Required<UpdateConditionOccurrencesIdFormBody>
  onSuccess: () => void
}

export type UpdateConditionOccurrencesIdFormPathParams = { id: string }

export const UpdateConditionOccurrencesIdForm = (
  props: UpdateConditionOccurrencesIdFormProps,
) => {
  const form = useForm<Required<UpdateConditionOccurrencesIdFormBody>>({
    resolver: zodResolver(clinicalConditionOccurrenceCreate.required()),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiConditionOccurrencesId()

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
          lens={lens.focus('condition_concept_id')}
          label="condition_concept_id"
        />
        <StringField
          lens={lens.focus('condition_start_date')}
          label="condition_start_date"
        />
        <StringField
          lens={lens.focus('condition_start_datetime')}
          label="condition_start_datetime"
        />
        <StringField
          lens={lens.focus('condition_end_date')}
          label="condition_end_date"
        />
        <StringField
          lens={lens.focus('condition_end_datetime')}
          label="condition_end_datetime"
        />
        <IntegerField
          lens={lens.focus('condition_type_concept_id')}
          label="condition_type_concept_id"
        />
        <IntegerField
          lens={lens.focus('condition_status_concept_id')}
          label="condition_status_concept_id"
        />
        <StringField lens={lens.focus('stop_reason')} label="stop_reason" />
        <IntegerField lens={lens.focus('provider_id')} label="provider_id" />
        <IntegerField
          lens={lens.focus('visit_occurrence_id')}
          label="visit_occurrence_id"
        />
        <IntegerField
          lens={lens.focus('visit_detail_id')}
          label="visit_detail_id"
        />
        <StringField
          lens={lens.focus('condition_source_value')}
          label="condition_source_value"
        />
        <IntegerField
          lens={lens.focus('condition_source_concept_id')}
          label="condition_source_concept_id"
        />
        <StringField
          lens={lens.focus('condition_status_source_value')}
          label="condition_status_source_value"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
