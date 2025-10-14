import { clinicalNoteNlpCreate } from '@/types/clinicalNoteNlpCreate.generated.ts'
import { useUpdateApiNoteNlpsNoteNlpId } from '@/services/useUpdateApiNoteNlpsNoteNlpId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateNoteNlpsNoteNlpIdFormBody = {
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

export type UpdateNoteNlpsNoteNlpIdFormProps = {
  note_nlp_id: number
  defaultValues: UpdateNoteNlpsNoteNlpIdFormBody
  onSuccess: () => void
}

export type UpdateNoteNlpsNoteNlpIdFormPathParams = { note_nlp_id: number }

export const UpdateNoteNlpsNoteNlpIdForm = (
  props: UpdateNoteNlpsNoteNlpIdFormProps,
) => {
  const form = useForm<UpdateNoteNlpsNoteNlpIdFormBody>({
    resolver: zodResolver(clinicalNoteNlpCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiNoteNlpsNoteNlpId()

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
