import { vocabularyVocabularyCreate } from '@/types/vocabularyVocabularyCreate.generated.ts'
import { StringField } from '@/components/fields/string-field'
import { IntegerField } from '@/components/fields/integer-field'
import { useUpdateApiVocabularysVocabularyId } from '@/services/useUpdateApiVocabularysVocabularyId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateVocabularysVocabularyIdFormBody = {
  vocabulary_name: string
  vocabulary_reference?: string | undefined
  vocabulary_version?: string | undefined
  vocabulary_concept_id: number
}

export const UpdateVocabularysVocabularyIdFormFields = () => {
  return (
    <>
      <StringField fieldName={`vocabulary_name`} label="vocabulary_name" />
      <StringField
        fieldName={`vocabulary_reference`}
        label="vocabulary_reference"
      />
      <StringField
        fieldName={`vocabulary_version`}
        label="vocabulary_version"
      />
      <IntegerField fieldName={`vocabulary_concept_id`} />
    </>
  )
}

export type UpdateVocabularysVocabularyIdFormProps = {
  vocabulary_id: string
  defaultValues: UpdateVocabularysVocabularyIdFormBody
  onSuccess: () => void
}

export type UpdateVocabularysVocabularyIdFormPathParams = {
  vocabulary_id: string
}

export const UpdateVocabularysVocabularyIdForm = (
  props: UpdateVocabularysVocabularyIdFormProps,
) => {
  const form = useForm<UpdateVocabularysVocabularyIdFormBody>({
    resolver: zodResolver(vocabularyVocabularyCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiVocabularysVocabularyId()

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
        <UpdateVocabularysVocabularyIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
