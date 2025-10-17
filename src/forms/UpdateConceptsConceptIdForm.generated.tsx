import { vocabularyConceptCreate } from '@/types/vocabularyConceptCreate.generated.ts'
import { StringField } from '@/components/fields/string-field'
import { useUpdateApiConceptsConceptId } from '@/services/useUpdateApiConceptsConceptId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateConceptsConceptIdFormBody = {
  concept_name: string
  domain_id: string
  vocabulary_id: string
  concept_class_id: string
  standard_concept?: string | undefined
  concept_code: string
  valid_start_date: string
  valid_end_date: string
  invalid_reason?: string | undefined
}

export const UpdateConceptsConceptIdFormFields = () => {
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

export type UpdateConceptsConceptIdFormProps = {
  concept_id: number
  defaultValues: UpdateConceptsConceptIdFormBody
  onSuccess: () => void
}

export type UpdateConceptsConceptIdFormPathParams = { concept_id: number }

export const UpdateConceptsConceptIdForm = (
  props: UpdateConceptsConceptIdFormProps,
) => {
  const form = useForm<UpdateConceptsConceptIdFormBody>({
    resolver: zodResolver(vocabularyConceptCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiConceptsConceptId()

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
        <UpdateConceptsConceptIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
