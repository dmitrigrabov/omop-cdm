import { clinicalProcedureOccurrenceCreate } from '@/types/clinicalProcedureOccurrenceCreate.generated.ts'
import { useUpdateApiProcedureOccurrencesProcedureOccurrenceId } from '@/services/useUpdateApiProcedureOccurrencesProcedureOccurrenceId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateProcedureOccurrencesProcedureOccurrenceIdFormBody = {
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

export type UpdateProcedureOccurrencesProcedureOccurrenceIdFormProps = {
  procedure_occurrence_id: number
  defaultValues: UpdateProcedureOccurrencesProcedureOccurrenceIdFormBody
  onSuccess: () => void
}

export type UpdateProcedureOccurrencesProcedureOccurrenceIdFormPathParams = {
  procedure_occurrence_id: number
}

export const UpdateProcedureOccurrencesProcedureOccurrenceIdForm = (
  props: UpdateProcedureOccurrencesProcedureOccurrenceIdFormProps,
) => {
  const form = useForm<UpdateProcedureOccurrencesProcedureOccurrenceIdFormBody>(
    {
      resolver: zodResolver(clinicalProcedureOccurrenceCreate),
      defaultValues: props.defaultValues,
    },
  )

  const lens = useLens(form)

  const mutator = useUpdateApiProcedureOccurrencesProcedureOccurrenceId()

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
