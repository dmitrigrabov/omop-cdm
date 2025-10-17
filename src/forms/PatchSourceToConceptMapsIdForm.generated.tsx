import { vocabularySourceToConceptMapUpdate } from '@/types/vocabularySourceToConceptMapUpdate.generated.ts'
import { StringField } from '@/components/fields/string-field'
import { IntegerField } from '@/components/fields/integer-field'
import { usePatchApiSourceToConceptMapsId } from '@/services/usePatchApiSourceToConceptMapsId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchSourceToConceptMapsIdFormBody = {
  source_code?: string | undefined
  source_concept_id?: number | undefined
  source_vocabulary_id?: string | undefined
  source_code_description?: string | undefined
  target_concept_id?: number | undefined
  target_vocabulary_id?: string | undefined
  valid_start_date?: string | undefined
  valid_end_date?: string | undefined
  invalid_reason?: string | undefined
}

export type PatchSourceToConceptMapsIdFormProps = {
  id: string
  defaultValues: Required<PatchSourceToConceptMapsIdFormBody>
  onSuccess: () => void
}

export type PatchSourceToConceptMapsIdFormPathParams = { id: string }

export const PatchSourceToConceptMapsIdForm = (
  props: PatchSourceToConceptMapsIdFormProps,
) => {
  const form = useForm<Required<PatchSourceToConceptMapsIdFormBody>>({
    resolver: zodResolver(vocabularySourceToConceptMapUpdate.required()),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiSourceToConceptMapsId()

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
        <StringField lens={lens.focus('source_code')} label="source_code" />
        <IntegerField
          lens={lens.focus('source_concept_id')}
          label="source_concept_id"
        />
        <StringField
          lens={lens.focus('source_vocabulary_id')}
          label="source_vocabulary_id"
        />
        <StringField
          lens={lens.focus('source_code_description')}
          label="source_code_description"
        />
        <IntegerField
          lens={lens.focus('target_concept_id')}
          label="target_concept_id"
        />
        <StringField
          lens={lens.focus('target_vocabulary_id')}
          label="target_vocabulary_id"
        />
        <StringField
          lens={lens.focus('valid_start_date')}
          label="valid_start_date"
        />
        <StringField
          lens={lens.focus('valid_end_date')}
          label="valid_end_date"
        />
        <StringField
          lens={lens.focus('invalid_reason')}
          label="invalid_reason"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
