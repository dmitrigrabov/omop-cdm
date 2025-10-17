import { vocabularyConceptSynonymCreate } from '@/types/vocabularyConceptSynonymCreate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { useCreateApiConceptSynonyms } from '@/services/useCreateApiConceptSynonyms.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type CreateConceptSynonymsFormBody = {
  concept_id: number
  concept_synonym_name: string
  language_concept_id: number
}

export type CreateConceptSynonymsFormProps = {
  defaultValues: Required<CreateConceptSynonymsFormBody>
  onSuccess: () => void
}

export type CreateConceptSynonymsFormPathParams = Record<string, never>

export const CreateConceptSynonymsForm = (
  props: CreateConceptSynonymsFormProps,
) => {
  const form = useForm<Required<CreateConceptSynonymsFormBody>>({
    resolver: zodResolver(vocabularyConceptSynonymCreate.required()),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useCreateApiConceptSynonyms()

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
        <IntegerField lens={lens.focus('concept_id')} label="concept_id" />
        <StringField
          lens={lens.focus('concept_synonym_name')}
          label="concept_synonym_name"
        />
        <IntegerField
          lens={lens.focus('language_concept_id')}
          label="language_concept_id"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
