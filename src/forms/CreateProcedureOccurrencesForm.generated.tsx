import { clinicalProcedureOccurrenceCreate } from '@/types/clinicalProcedureOccurrenceCreate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { useCreateApiProcedureOccurrences } from '@/services/useCreateApiProcedureOccurrences.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type CreateProcedureOccurrencesFormBody = {
  person_id: number
  procedure_concept_id: number
  procedure_date: string
  procedure_datetime?: string | undefined
  procedure_end_date?: string | undefined
  procedure_end_datetime?: string | undefined
  procedure_type_concept_id: number
  modifier_concept_id?: number | undefined
  quantity?: number | undefined
  provider_id?: number | undefined
  visit_occurrence_id?: number | undefined
  visit_detail_id?: number | undefined
  procedure_source_value?: string | undefined
  procedure_source_concept_id?: number | undefined
  modifier_source_value?: string | undefined
}

export type CreateProcedureOccurrencesFormProps = {
  defaultValues: Required<CreateProcedureOccurrencesFormBody>
  onSuccess: () => void
}

export type CreateProcedureOccurrencesFormPathParams = Record<string, never>

export const CreateProcedureOccurrencesForm = (
  props: CreateProcedureOccurrencesFormProps,
) => {
  const form = useForm<Required<CreateProcedureOccurrencesFormBody>>({
    resolver: zodResolver(clinicalProcedureOccurrenceCreate.required()),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useCreateApiProcedureOccurrences()

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
          lens={lens.focus('procedure_concept_id')}
          label="procedure_concept_id"
        />
        <StringField
          lens={lens.focus('procedure_date')}
          label="procedure_date"
        />
        <StringField
          lens={lens.focus('procedure_datetime')}
          label="procedure_datetime"
        />
        <StringField
          lens={lens.focus('procedure_end_date')}
          label="procedure_end_date"
        />
        <StringField
          lens={lens.focus('procedure_end_datetime')}
          label="procedure_end_datetime"
        />
        <IntegerField
          lens={lens.focus('procedure_type_concept_id')}
          label="procedure_type_concept_id"
        />
        <IntegerField
          lens={lens.focus('modifier_concept_id')}
          label="modifier_concept_id"
        />
        <IntegerField lens={lens.focus('quantity')} label="quantity" />
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
          lens={lens.focus('procedure_source_value')}
          label="procedure_source_value"
        />
        <IntegerField
          lens={lens.focus('procedure_source_concept_id')}
          label="procedure_source_concept_id"
        />
        <StringField
          lens={lens.focus('modifier_source_value')}
          label="modifier_source_value"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
