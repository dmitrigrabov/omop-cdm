import { vocabularyConceptSynonymCreate } from '@/types/vocabularyConceptSynonymCreate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { useUpdateApiConceptSynonymsId } from '@/services/useUpdateApiConceptSynonymsId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateConceptSynonymsIdFormBody = {
  concept_id: number
  concept_synonym_name: string
  language_concept_id: number
}

export const UpdateConceptSynonymsIdFormFields = () => {
  return (
    <>
      <IntegerField fieldName={`concept_id`} />
      <StringField
        fieldName={`concept_synonym_name`}
        label="concept_synonym_name"
      />
      <IntegerField fieldName={`language_concept_id`} />
    </>
  )
}

export type UpdateConceptSynonymsIdFormProps = {
  id: number
  defaultValues: UpdateConceptSynonymsIdFormBody
  onSuccess: () => void
}

export type UpdateConceptSynonymsIdFormPathParams = { id: number }

export const UpdateConceptSynonymsIdForm = (
  props: UpdateConceptSynonymsIdFormProps,
) => {
  const form = useForm<UpdateConceptSynonymsIdFormBody>({
    resolver: zodResolver(vocabularyConceptSynonymCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiConceptSynonymsId()

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
        <UpdateConceptSynonymsIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
