import { vocabularyConceptSynonymUpdate } from '@/types/vocabularyConceptSynonymUpdate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { usePatchApiConceptSynonymsId } from '@/services/usePatchApiConceptSynonymsId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchConceptSynonymsIdFormBody = {
  concept_id?: number | undefined
  concept_synonym_name?: string | undefined
  language_concept_id?: number | undefined
}

export const PatchConceptSynonymsIdFormFields = () => {
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

export type PatchConceptSynonymsIdFormProps = {
  id: number
  defaultValues: PatchConceptSynonymsIdFormBody
  onSuccess: () => void
}

export type PatchConceptSynonymsIdFormPathParams = { id: number }

export const PatchConceptSynonymsIdForm = (
  props: PatchConceptSynonymsIdFormProps,
) => {
  const form = useForm<PatchConceptSynonymsIdFormBody>({
    resolver: zodResolver(vocabularyConceptSynonymUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiConceptSynonymsId()

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
        <PatchConceptSynonymsIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
