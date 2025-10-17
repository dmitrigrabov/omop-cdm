import { vocabularySourceToConceptMapUpdate } from '@/types/vocabularySourceToConceptMapUpdate.generated.ts'
import { StringField } from '@/components/fields/string-field'
import { IntegerField } from '@/components/fields/integer-field'
import { usePatchApiSourceToConceptMapsSourceToConceptMapId } from '@/services/usePatchApiSourceToConceptMapsSourceToConceptMapId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchSourceToConceptMapsSourceToConceptMapIdFormBody = {
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

export const PatchSourceToConceptMapsSourceToConceptMapIdFormFields = () => {
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

export type PatchSourceToConceptMapsSourceToConceptMapIdFormProps = {
  source_to_concept_map_id: number
  defaultValues: PatchSourceToConceptMapsSourceToConceptMapIdFormBody
  onSuccess: () => void
}

export type PatchSourceToConceptMapsSourceToConceptMapIdFormPathParams = {
  source_to_concept_map_id: number
}

export const PatchSourceToConceptMapsSourceToConceptMapIdForm = (
  props: PatchSourceToConceptMapsSourceToConceptMapIdFormProps,
) => {
  const form = useForm<PatchSourceToConceptMapsSourceToConceptMapIdFormBody>({
    resolver: zodResolver(vocabularySourceToConceptMapUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiSourceToConceptMapsSourceToConceptMapId()

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
        <PatchSourceToConceptMapsSourceToConceptMapIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
