import { clinicalNoteUpdate } from '@/types/clinicalNoteUpdate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { usePatchApiNotesId } from '@/services/usePatchApiNotesId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchNotesIdFormBody = {
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

export type PatchNotesIdFormProps = {
  id: string
  defaultValues: Required<PatchNotesIdFormBody>
  onSuccess: () => void
}

export type PatchNotesIdFormPathParams = { id: string }

export const PatchNotesIdForm = (props: PatchNotesIdFormProps) => {
  const form = useForm<Required<PatchNotesIdFormBody>>({
    resolver: zodResolver(clinicalNoteUpdate.required()),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiNotesId()

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
        <StringField lens={lens.focus('note_date')} label="note_date" />
        <StringField lens={lens.focus('note_datetime')} label="note_datetime" />
        <IntegerField
          lens={lens.focus('note_type_concept_id')}
          label="note_type_concept_id"
        />
        <IntegerField
          lens={lens.focus('note_class_concept_id')}
          label="note_class_concept_id"
        />
        <StringField lens={lens.focus('note_title')} label="note_title" />
        <StringField lens={lens.focus('note_text')} label="note_text" />
        <IntegerField
          lens={lens.focus('encoding_concept_id')}
          label="encoding_concept_id"
        />
        <IntegerField
          lens={lens.focus('language_concept_id')}
          label="language_concept_id"
        />
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
          lens={lens.focus('note_source_value')}
          label="note_source_value"
        />
        <IntegerField
          lens={lens.focus('note_event_id')}
          label="note_event_id"
        />
        <IntegerField
          lens={lens.focus('note_event_field_concept_id')}
          label="note_event_field_concept_id"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
