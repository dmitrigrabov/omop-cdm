import { clinicalVisitOccurrenceCreate } from '@/types/clinicalVisitOccurrenceCreate.generated.ts'
import { useCreateApiVisitOccurrences } from '@/services/useCreateApiVisitOccurrences.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type CreateVisitOccurrencesFormBody = {
  person_id: number
  visit_concept_id: number
  visit_start_date: string
  visit_start_datetime?: string | undefined
  visit_end_date: string
  visit_end_datetime?: string | undefined
  visit_type_concept_id: number
  provider_id?: number | undefined
  care_site_id?: number | undefined
  visit_source_value?: string | undefined
  visit_source_concept_id?: number | undefined
  admitted_from_concept_id?: number | undefined
  admitted_from_source_value?: string | undefined
  discharged_to_concept_id?: number | undefined
  discharged_to_source_value?: string | undefined
  preceding_visit_occurrence_id?: number | undefined
}

export type CreateVisitOccurrencesFormProps = {
  defaultValues: CreateVisitOccurrencesFormBody
  onSuccess: () => void
}

export type CreateVisitOccurrencesFormPathParams = Record<string, never>

export const CreateVisitOccurrencesForm = (
  props: CreateVisitOccurrencesFormProps,
) => {
  const form = useForm<CreateVisitOccurrencesFormBody>({
    resolver: zodResolver(clinicalVisitOccurrenceCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useCreateApiVisitOccurrences()

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
