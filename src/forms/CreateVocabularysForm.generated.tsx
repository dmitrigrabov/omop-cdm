import { vocabularyVocabularyCreate } from '@/types/vocabularyVocabularyCreate.generated.ts'
import { useCreateApiVocabularys } from '@/services/useCreateApiVocabularys.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type CreateVocabularysFormBody = {
  vocabulary_name: string
  vocabulary_reference?: string | undefined
  vocabulary_version?: string | undefined
  vocabulary_concept_id: number
}

export type CreateVocabularysFormProps = {
  defaultValues: CreateVocabularysFormBody
  onSuccess: () => void
}

export type CreateVocabularysFormPathParams = Record<string, never>

export const CreateVocabularysForm = (props: CreateVocabularysFormProps) => {
  const form = useForm<CreateVocabularysFormBody>({
    resolver: zodResolver(vocabularyVocabularyCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useCreateApiVocabularys()

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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
