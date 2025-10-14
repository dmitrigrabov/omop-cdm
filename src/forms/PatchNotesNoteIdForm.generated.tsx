import { clinicalNoteUpdate } from '@/types/clinicalNoteUpdate.generated.ts'
import { usePatchApiNotesNoteId } from '@/services/usePatchApiNotesNoteId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchNotesNoteIdFormBody = {
  person_id?: number | undefined
  note_date?: string | undefined
  note_datetime?: string | undefined
  note_type_concept_id?: number | undefined
  note_class_concept_id?: number | undefined
  note_title?: string | undefined
  note_text?: string | undefined
  encoding_concept_id?: number | undefined
  language_concept_id?: number | undefined
  provider_id?: number | undefined
  visit_occurrence_id?: number | undefined
  visit_detail_id?: number | undefined
  note_source_value?: string | undefined
  note_event_id?: number | undefined
  note_event_field_concept_id?: number | undefined
}

export type PatchNotesNoteIdFormProps = {
  note_id: number
  defaultValues: PatchNotesNoteIdFormBody
  onSuccess: () => void
}

export type PatchNotesNoteIdFormPathParams = { note_id: number }

export const PatchNotesNoteIdForm = (props: PatchNotesNoteIdFormProps) => {
  const form = useForm<PatchNotesNoteIdFormBody>({
    resolver: zodResolver(clinicalNoteUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiNotesNoteId()

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
