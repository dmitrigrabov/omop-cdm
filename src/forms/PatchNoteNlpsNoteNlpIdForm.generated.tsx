import { clinicalNoteNlpUpdate } from '@/types/clinicalNoteNlpUpdate.generated.ts'
import { usePatchApiNoteNlpsNoteNlpId } from '@/services/usePatchApiNoteNlpsNoteNlpId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchNoteNlpsNoteNlpIdFormBody = {
  note_id?: number | undefined
  section_concept_id?: number | undefined
  snippet?: string | undefined
  lexical_variant?: string | undefined
  note_nlp_concept_id?: number | undefined
  note_nlp_source_concept_id?: number | undefined
  nlp_system?: string | undefined
  nlp_date?: string | undefined
  nlp_datetime?: string | undefined
  term_exists?: string | undefined
  term_temporal?: string | undefined
  term_modifiers?: string | undefined
}

export type PatchNoteNlpsNoteNlpIdFormProps = {
  note_nlp_id: number
  defaultValues: PatchNoteNlpsNoteNlpIdFormBody
  onSuccess: () => void
}

export type PatchNoteNlpsNoteNlpIdFormPathParams = { note_nlp_id: number }

export const PatchNoteNlpsNoteNlpIdForm = (
  props: PatchNoteNlpsNoteNlpIdFormProps,
) => {
  const form = useForm<PatchNoteNlpsNoteNlpIdFormBody>({
    resolver: zodResolver(clinicalNoteNlpUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiNoteNlpsNoteNlpId()

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
