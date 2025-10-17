import { clinicalProcedureOccurrenceUpdate } from '@/types/clinicalProcedureOccurrenceUpdate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { usePatchApiProcedureOccurrencesId } from '@/services/usePatchApiProcedureOccurrencesId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchProcedureOccurrencesIdFormBody = {
  person_id?: number | undefined
  procedure_concept_id?: number | undefined
  procedure_date?: string | undefined
  procedure_datetime?: string | undefined
  procedure_end_date?: string | undefined
  procedure_end_datetime?: string | undefined
  procedure_type_concept_id?: number | undefined
  modifier_concept_id?: number | undefined
  quantity?: number | undefined
  provider_id?: number | undefined
  visit_occurrence_id?: number | undefined
  visit_detail_id?: number | undefined
  procedure_source_value?: string | undefined
  procedure_source_concept_id?: number | undefined
  modifier_source_value?: string | undefined
}

export const PatchProcedureOccurrencesIdFormFields = () => {
  return (
    <>
      <IntegerField fieldName={`person_id`} />
      <IntegerField fieldName={`procedure_concept_id`} />
      <StringField fieldName={`procedure_date`} label="procedure_date" />
      <StringField
        fieldName={`procedure_datetime`}
        label="procedure_datetime"
      />
      <StringField
        fieldName={`procedure_end_date`}
        label="procedure_end_date"
      />
      <StringField
        fieldName={`procedure_end_datetime`}
        label="procedure_end_datetime"
      />
      <IntegerField fieldName={`procedure_type_concept_id`} />
      <IntegerField fieldName={`modifier_concept_id`} />
      <IntegerField fieldName={`quantity`} />
      <IntegerField fieldName={`provider_id`} />
      <IntegerField fieldName={`visit_occurrence_id`} />
      <IntegerField fieldName={`visit_detail_id`} />
      <StringField
        fieldName={`procedure_source_value`}
        label="procedure_source_value"
      />
      <IntegerField fieldName={`procedure_source_concept_id`} />
      <StringField
        fieldName={`modifier_source_value`}
        label="modifier_source_value"
      />
    </>
  )
}

export type PatchProcedureOccurrencesIdFormProps = {
  id: number
  defaultValues: PatchProcedureOccurrencesIdFormBody
  onSuccess: () => void
}

export type PatchProcedureOccurrencesIdFormPathParams = { id: number }

export const PatchProcedureOccurrencesIdForm = (
  props: PatchProcedureOccurrencesIdFormProps,
) => {
  const form = useForm<PatchProcedureOccurrencesIdFormBody>({
    resolver: zodResolver(clinicalProcedureOccurrenceUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiProcedureOccurrencesId()

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
        <PatchProcedureOccurrencesIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
