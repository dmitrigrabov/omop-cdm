import { vocabularyRelationshipUpdate } from '@/types/vocabularyRelationshipUpdate.generated.ts'
import { StringField } from '@/components/fields/string-field'
import { IntegerField } from '@/components/fields/integer-field'
import { usePatchApiRelationshipsRelationshipId } from '@/services/usePatchApiRelationshipsRelationshipId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchRelationshipsRelationshipIdFormBody = {
  relationship_name?: string | undefined
  is_hierarchical?: string | undefined
  defines_ancestry?: string | undefined
  reverse_relationship_id?: string | undefined
  relationship_concept_id?: number | undefined
}

export const PatchRelationshipsRelationshipIdFormFields = () => {
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

export type PatchRelationshipsRelationshipIdFormProps = {
  relationship_id: string
  defaultValues: PatchRelationshipsRelationshipIdFormBody
  onSuccess: () => void
}

export type PatchRelationshipsRelationshipIdFormPathParams = {
  relationship_id: string
}

export const PatchRelationshipsRelationshipIdForm = (
  props: PatchRelationshipsRelationshipIdFormProps,
) => {
  const form = useForm<PatchRelationshipsRelationshipIdFormBody>({
    resolver: zodResolver(vocabularyRelationshipUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiRelationshipsRelationshipId()

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
        <PatchRelationshipsRelationshipIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
