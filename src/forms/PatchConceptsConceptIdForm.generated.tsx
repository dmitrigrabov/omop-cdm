import { vocabularyConceptUpdate } from '@/types/vocabularyConceptUpdate.generated.ts'
import { StringField } from '@/components/fields/string-field'
import { usePatchApiConceptsConceptId } from '@/services/usePatchApiConceptsConceptId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchConceptsConceptIdFormBody = {
  concept_name?: string | undefined
  domain_id?: string | undefined
  vocabulary_id?: string | undefined
  concept_class_id?: string | undefined
  standard_concept?: string | undefined
  concept_code?: string | undefined
  valid_start_date?: string | undefined
  valid_end_date?: string | undefined
  invalid_reason?: string | undefined
}

export const PatchConceptsConceptIdFormFields = () => {
  return (
    <>
      <StringField fieldName={`concept_name`} label="concept_name" />
      <StringField fieldName={`domain_id`} label="domain_id" />
      <StringField fieldName={`vocabulary_id`} label="vocabulary_id" />
      <StringField fieldName={`concept_class_id`} label="concept_class_id" />
      <StringField fieldName={`standard_concept`} label="standard_concept" />
      <StringField fieldName={`concept_code`} label="concept_code" />
      <StringField fieldName={`valid_start_date`} label="valid_start_date" />
      <StringField fieldName={`valid_end_date`} label="valid_end_date" />
      <StringField fieldName={`invalid_reason`} label="invalid_reason" />
    </>
  )
}

export type PatchConceptsConceptIdFormProps = {
  concept_id: number
  defaultValues: PatchConceptsConceptIdFormBody
  onSuccess: () => void
}

export type PatchConceptsConceptIdFormPathParams = { concept_id: number }

export const PatchConceptsConceptIdForm = (
  props: PatchConceptsConceptIdFormProps,
) => {
  const form = useForm<PatchConceptsConceptIdFormBody>({
    resolver: zodResolver(vocabularyConceptUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiConceptsConceptId()

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
        <PatchConceptsConceptIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
