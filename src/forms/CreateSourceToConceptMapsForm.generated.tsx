import { vocabularySourceToConceptMapCreate } from '@/types/vocabularySourceToConceptMapCreate.generated.ts'
import { StringField } from '@/components/fields/string-field'
import { IntegerField } from '@/components/fields/integer-field'
import { useCreateApiSourceToConceptMaps } from '@/services/useCreateApiSourceToConceptMaps.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type CreateSourceToConceptMapsFormBody = {
  source_code: string
  source_concept_id: number
  source_vocabulary_id: string
  source_code_description?: string | undefined
  target_concept_id: number
  target_vocabulary_id: string
  valid_start_date: string
  valid_end_date: string
  invalid_reason?: string | undefined
}

export type CreateSourceToConceptMapsFormProps = {
  defaultValues: Required<CreateSourceToConceptMapsFormBody>
  onSuccess: () => void
}

export type CreateSourceToConceptMapsFormPathParams = Record<string, never>

export const CreateSourceToConceptMapsForm = (
  props: CreateSourceToConceptMapsFormProps,
) => {
  const form = useForm<Required<CreateSourceToConceptMapsFormBody>>({
    resolver: zodResolver(vocabularySourceToConceptMapCreate.required()),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useCreateApiSourceToConceptMaps()

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
