import { clinicalNoteNlpCreate } from '@/types/clinicalNoteNlpCreate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { useUpdateApiNoteNlpsId } from '@/services/useUpdateApiNoteNlpsId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateNoteNlpsIdFormBody = {
  note_id: number
  section_concept_id?: number | undefined
  snippet?: string | undefined
  lexical_variant: string
  note_nlp_concept_id?: number | undefined
  note_nlp_source_concept_id?: number | undefined
  nlp_system?: string | undefined
  nlp_date: string
  nlp_datetime?: string | undefined
  term_exists?: string | undefined
  term_temporal?: string | undefined
  term_modifiers?: string | undefined
}

export const UpdateNoteNlpsIdFormFields = () => {
  return (
    <>
      <IntegerField fieldName={`note_id`} />
      <IntegerField fieldName={`section_concept_id`} />
      <StringField fieldName={`snippet`} label="snippet" />
      <StringField fieldName={`lexical_variant`} label="lexical_variant" />
      <IntegerField fieldName={`note_nlp_concept_id`} />
      <IntegerField fieldName={`note_nlp_source_concept_id`} />
      <StringField fieldName={`nlp_system`} label="nlp_system" />
      <StringField fieldName={`nlp_date`} label="nlp_date" />
      <StringField fieldName={`nlp_datetime`} label="nlp_datetime" />
      <StringField fieldName={`term_exists`} label="term_exists" />
      <StringField fieldName={`term_temporal`} label="term_temporal" />
      <StringField fieldName={`term_modifiers`} label="term_modifiers" />
    </>
  )
}

export type UpdateNoteNlpsIdFormProps = {
  id: number
  defaultValues: UpdateNoteNlpsIdFormBody
  onSuccess: () => void
}

export type UpdateNoteNlpsIdFormPathParams = { id: number }

export const UpdateNoteNlpsIdForm = (props: UpdateNoteNlpsIdFormProps) => {
  const form = useForm<UpdateNoteNlpsIdFormBody>({
    resolver: zodResolver(clinicalNoteNlpCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiNoteNlpsId()

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
        <UpdateNoteNlpsIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
