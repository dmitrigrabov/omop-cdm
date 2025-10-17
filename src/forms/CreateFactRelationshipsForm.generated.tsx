import { resultsFactRelationshipCreate } from '@/types/resultsFactRelationshipCreate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { useCreateApiFactRelationships } from '@/services/useCreateApiFactRelationships.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type CreateFactRelationshipsFormBody = {
  relationship_concept_id: number
}

export const CreateFactRelationshipsFormFields = () => {
  return (
    <>
      <IntegerField fieldName={`relationship_concept_id`} />
    </>
  )
}

export type CreateFactRelationshipsFormProps = {
  defaultValues: CreateFactRelationshipsFormBody
  onSuccess: () => void
}

export type CreateFactRelationshipsFormPathParams = Record<string, never>

export const CreateFactRelationshipsForm = (
  props: CreateFactRelationshipsFormProps,
) => {
  const form = useForm<CreateFactRelationshipsFormBody>({
    resolver: zodResolver(resultsFactRelationshipCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useCreateApiFactRelationships()

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
        <CreateFactRelationshipsFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
