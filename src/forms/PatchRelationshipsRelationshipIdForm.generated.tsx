import { vocabularyRelationshipUpdate } from '@/types/vocabularyRelationshipUpdate.generated.ts'
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
