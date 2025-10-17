import { vocabularyConceptClassCreate } from '@/types/vocabularyConceptClassCreate.generated.ts'
import { StringField } from '@/components/fields/string-field'
import { IntegerField } from '@/components/fields/integer-field'
import { useUpdateApiConceptClasssId } from '@/services/useUpdateApiConceptClasssId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateConceptClasssIdFormBody = {
  concept_class_name: string
  concept_class_concept_id: number
}

export const UpdateConceptClasssIdFormFields = () => {
  return (
    <>
      <StringField
        fieldName={`concept_class_name`}
        label="concept_class_name"
      />
      <IntegerField fieldName={`concept_class_concept_id`} />
    </>
  )
}

export type UpdateConceptClasssIdFormProps = {
  id: string
  defaultValues: UpdateConceptClasssIdFormBody
  onSuccess: () => void
}

export type UpdateConceptClasssIdFormPathParams = { id: string }

export const UpdateConceptClasssIdForm = (
  props: UpdateConceptClasssIdFormProps,
) => {
  const form = useForm<UpdateConceptClasssIdFormBody>({
    resolver: zodResolver(vocabularyConceptClassCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiConceptClasssId()

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
        <UpdateConceptClasssIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
