import { vocabularyVocabularyUpdate } from '@/types/vocabularyVocabularyUpdate.generated.ts'
import { StringField } from '@/components/fields/string-field'
import { IntegerField } from '@/components/fields/integer-field'
import { usePatchApiVocabularysVocabularyId } from '@/services/usePatchApiVocabularysVocabularyId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchVocabularysVocabularyIdFormBody = {
  vocabulary_name?: string | undefined
  vocabulary_reference?: string | undefined
  vocabulary_version?: string | undefined
  vocabulary_concept_id?: number | undefined
}

export const PatchVocabularysVocabularyIdFormFields = () => {
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

export type PatchVocabularysVocabularyIdFormProps = {
  vocabulary_id: string
  defaultValues: PatchVocabularysVocabularyIdFormBody
  onSuccess: () => void
}

export type PatchVocabularysVocabularyIdFormPathParams = {
  vocabulary_id: string
}

export const PatchVocabularysVocabularyIdForm = (
  props: PatchVocabularysVocabularyIdFormProps,
) => {
  const form = useForm<PatchVocabularysVocabularyIdFormBody>({
    resolver: zodResolver(vocabularyVocabularyUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiVocabularysVocabularyId()

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
        <PatchVocabularysVocabularyIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
