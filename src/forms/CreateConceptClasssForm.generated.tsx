import { vocabularyConceptClassCreate } from '@/types/vocabularyConceptClassCreate.generated.ts'
import { StringField } from '@/components/fields/string-field'
import { IntegerField } from '@/components/fields/integer-field'
import { useCreateApiConceptClasss } from '@/services/useCreateApiConceptClasss.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type CreateConceptClasssFormBody = {
  concept_class_name: string
  concept_class_concept_id: number
}

export type CreateConceptClasssFormProps = {
  defaultValues: Required<CreateConceptClasssFormBody>
  onSuccess: () => void
}

export type CreateConceptClasssFormPathParams = Record<string, never>

export const CreateConceptClasssForm = (
  props: CreateConceptClasssFormProps,
) => {
  const form = useForm<Required<CreateConceptClasssFormBody>>({
    resolver: zodResolver(vocabularyConceptClassCreate.required()),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useCreateApiConceptClasss()

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
        <StringField
          lens={lens.focus('concept_class_name')}
          label="concept_class_name"
        />
        <IntegerField
          lens={lens.focus('concept_class_concept_id')}
          label="concept_class_concept_id"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
