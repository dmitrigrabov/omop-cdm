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

export const CreateSourceToConceptMapsFormFields = () => {
  return (
    <>
      <StringField fieldName={`source_code`} label="source_code" />
      <IntegerField fieldName={`source_concept_id`} />
      <StringField
        fieldName={`source_vocabulary_id`}
        label="source_vocabulary_id"
      />
      <StringField
        fieldName={`source_code_description`}
        label="source_code_description"
      />
      <IntegerField fieldName={`target_concept_id`} />
      <StringField
        fieldName={`target_vocabulary_id`}
        label="target_vocabulary_id"
      />
      <StringField fieldName={`valid_start_date`} label="valid_start_date" />
      <StringField fieldName={`valid_end_date`} label="valid_end_date" />
      <StringField fieldName={`invalid_reason`} label="invalid_reason" />
    </>
  )
}

export type CreateSourceToConceptMapsFormProps = {
  defaultValues: CreateSourceToConceptMapsFormBody
  onSuccess: () => void
}

export type CreateSourceToConceptMapsFormPathParams = Record<string, never>

export const CreateSourceToConceptMapsForm = (
  props: CreateSourceToConceptMapsFormProps,
) => {
  const form = useForm<CreateSourceToConceptMapsFormBody>({
    resolver: zodResolver(vocabularySourceToConceptMapCreate),
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
        <CreateSourceToConceptMapsFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
