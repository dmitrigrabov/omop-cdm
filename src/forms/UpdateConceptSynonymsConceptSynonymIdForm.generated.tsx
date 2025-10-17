import { vocabularyConceptSynonymCreate } from '@/types/vocabularyConceptSynonymCreate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { useUpdateApiConceptSynonymsConceptSynonymId } from '@/services/useUpdateApiConceptSynonymsConceptSynonymId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateConceptSynonymsConceptSynonymIdFormBody = {
  concept_id: number
  concept_synonym_name: string
  language_concept_id: number
}

export const UpdateConceptSynonymsConceptSynonymIdFormFields = () => {
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

export type UpdateConceptSynonymsConceptSynonymIdFormProps = {
  concept_synonym_id: number
  defaultValues: UpdateConceptSynonymsConceptSynonymIdFormBody
  onSuccess: () => void
}

export type UpdateConceptSynonymsConceptSynonymIdFormPathParams = {
  concept_synonym_id: number
}

export const UpdateConceptSynonymsConceptSynonymIdForm = (
  props: UpdateConceptSynonymsConceptSynonymIdFormProps,
) => {
  const form = useForm<UpdateConceptSynonymsConceptSynonymIdFormBody>({
    resolver: zodResolver(vocabularyConceptSynonymCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiConceptSynonymsConceptSynonymId()

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
        <UpdateConceptSynonymsConceptSynonymIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
