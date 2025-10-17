import { clinicalNoteNlpCreate } from '@/types/clinicalNoteNlpCreate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { useCreateApiNoteNlps } from '@/services/useCreateApiNoteNlps.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type CreateNoteNlpsFormBody = {
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

export type CreateNoteNlpsFormProps = {
  defaultValues: Required<CreateNoteNlpsFormBody>
  onSuccess: () => void
}

export type CreateNoteNlpsFormPathParams = Record<string, never>

export const CreateNoteNlpsForm = (props: CreateNoteNlpsFormProps) => {
  const form = useForm<Required<CreateNoteNlpsFormBody>>({
    resolver: zodResolver(clinicalNoteNlpCreate.required()),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useCreateApiNoteNlps()

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
        <IntegerField lens={lens.focus('note_id')} label="note_id" />
        <IntegerField
          lens={lens.focus('section_concept_id')}
          label="section_concept_id"
        />
        <StringField lens={lens.focus('snippet')} label="snippet" />
        <StringField
          lens={lens.focus('lexical_variant')}
          label="lexical_variant"
        />
        <IntegerField
          lens={lens.focus('note_nlp_concept_id')}
          label="note_nlp_concept_id"
        />
        <IntegerField
          lens={lens.focus('note_nlp_source_concept_id')}
          label="note_nlp_source_concept_id"
        />
        <StringField lens={lens.focus('nlp_system')} label="nlp_system" />
        <StringField lens={lens.focus('nlp_date')} label="nlp_date" />
        <StringField lens={lens.focus('nlp_datetime')} label="nlp_datetime" />
        <StringField lens={lens.focus('term_exists')} label="term_exists" />
        <StringField lens={lens.focus('term_temporal')} label="term_temporal" />
        <StringField
          lens={lens.focus('term_modifiers')}
          label="term_modifiers"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
