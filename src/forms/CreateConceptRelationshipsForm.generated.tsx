import { vocabularyConceptRelationshipCreate } from '@/types/vocabularyConceptRelationshipCreate.generated.ts'
import { StringField } from '@/components/fields/string-field'
import { useCreateApiConceptRelationships } from '@/services/useCreateApiConceptRelationships.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type CreateConceptRelationshipsFormBody = {
  relationship_id: string
  valid_start_date: string
  valid_end_date: string
  invalid_reason?: string | undefined
}

export const CreateConceptRelationshipsFormFields = () => {
  return (
    <>
      <StringField fieldName={`relationship_id`} label="relationship_id" />
      <StringField fieldName={`valid_start_date`} label="valid_start_date" />
      <StringField fieldName={`valid_end_date`} label="valid_end_date" />
      <StringField fieldName={`invalid_reason`} label="invalid_reason" />
    </>
  )
}

export type CreateConceptRelationshipsFormProps = {
  defaultValues: CreateConceptRelationshipsFormBody
  onSuccess: () => void
}

export type CreateConceptRelationshipsFormPathParams = Record<string, never>

export const CreateConceptRelationshipsForm = (
  props: CreateConceptRelationshipsFormProps,
) => {
  const form = useForm<CreateConceptRelationshipsFormBody>({
    resolver: zodResolver(vocabularyConceptRelationshipCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useCreateApiConceptRelationships()

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
        <CreateConceptRelationshipsFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
