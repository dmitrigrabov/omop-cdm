import { vocabularyRelationshipCreate } from '@/types/vocabularyRelationshipCreate.generated.ts'
import { StringField } from '@/components/fields/string-field'
import { IntegerField } from '@/components/fields/integer-field'
import { useUpdateApiRelationshipsRelationshipId } from '@/services/useUpdateApiRelationshipsRelationshipId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateRelationshipsRelationshipIdFormBody = {
  relationship_name: string
  is_hierarchical: string
  defines_ancestry: string
  reverse_relationship_id: string
  relationship_concept_id: number
}

export const UpdateRelationshipsRelationshipIdFormFields = () => {
  return (
    <>
      <StringField fieldName={`relationship_name`} label="relationship_name" />
      <StringField fieldName={`is_hierarchical`} label="is_hierarchical" />
      <StringField fieldName={`defines_ancestry`} label="defines_ancestry" />
      <StringField
        fieldName={`reverse_relationship_id`}
        label="reverse_relationship_id"
      />
      <IntegerField fieldName={`relationship_concept_id`} />
    </>
  )
}

export type UpdateRelationshipsRelationshipIdFormProps = {
  relationship_id: string
  defaultValues: UpdateRelationshipsRelationshipIdFormBody
  onSuccess: () => void
}

export type UpdateRelationshipsRelationshipIdFormPathParams = {
  relationship_id: string
}

export const UpdateRelationshipsRelationshipIdForm = (
  props: UpdateRelationshipsRelationshipIdFormProps,
) => {
  const form = useForm<UpdateRelationshipsRelationshipIdFormBody>({
    resolver: zodResolver(vocabularyRelationshipCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiRelationshipsRelationshipId()

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
        <UpdateRelationshipsRelationshipIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
