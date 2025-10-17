import { vocabularyRelationshipUpdate } from '@/types/vocabularyRelationshipUpdate.generated.ts'
import { StringField } from '@/components/fields/string-field'
import { IntegerField } from '@/components/fields/integer-field'
import { usePatchApiRelationshipsId } from '@/services/usePatchApiRelationshipsId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchRelationshipsIdFormBody = {
  relationship_name?: string | undefined
  is_hierarchical?: string | undefined
  defines_ancestry?: string | undefined
  reverse_relationship_id?: string | undefined
  relationship_concept_id?: number | undefined
}

export type PatchRelationshipsIdFormProps = {
  id: string
  defaultValues: Required<PatchRelationshipsIdFormBody>
  onSuccess: () => void
}

export type PatchRelationshipsIdFormPathParams = { id: string }

export const PatchRelationshipsIdForm = (
  props: PatchRelationshipsIdFormProps,
) => {
  const form = useForm<Required<PatchRelationshipsIdFormBody>>({
    resolver: zodResolver(vocabularyRelationshipUpdate.required()),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiRelationshipsId()

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
          lens={lens.focus('relationship_name')}
          label="relationship_name"
        />
        <StringField
          lens={lens.focus('is_hierarchical')}
          label="is_hierarchical"
        />
        <StringField
          lens={lens.focus('defines_ancestry')}
          label="defines_ancestry"
        />
        <StringField
          lens={lens.focus('reverse_relationship_id')}
          label="reverse_relationship_id"
        />
        <IntegerField
          lens={lens.focus('relationship_concept_id')}
          label="relationship_concept_id"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
