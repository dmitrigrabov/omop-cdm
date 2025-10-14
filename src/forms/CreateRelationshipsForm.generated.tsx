import { vocabularyRelationshipCreate } from '@/types/vocabularyRelationshipCreate.generated.ts'
import { useCreateApiRelationships } from '@/services/useCreateApiRelationships.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type CreateRelationshipsFormBody = {
  relationship_name: string
  is_hierarchical: string
  defines_ancestry: string
  reverse_relationship_id: string
  relationship_concept_id: number
}

export type CreateRelationshipsFormProps = {
  defaultValues: CreateRelationshipsFormBody
  onSuccess: () => void
}

export type CreateRelationshipsFormPathParams = Record<string, never>

export const CreateRelationshipsForm = (
  props: CreateRelationshipsFormProps,
) => {
  const form = useForm<CreateRelationshipsFormBody>({
    resolver: zodResolver(vocabularyRelationshipCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useCreateApiRelationships()

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
