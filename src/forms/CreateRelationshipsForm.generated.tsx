import { vocabularyRelationshipCreate } from '@/types/vocabularyRelationshipCreate.generated.ts'
import { StringField } from '@/components/fields/string-field'
import { IntegerField } from '@/components/fields/integer-field'
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
  defaultValues: Required<CreateRelationshipsFormBody>
  onSuccess: () => void
}

export type CreateRelationshipsFormPathParams = Record<string, never>

export const CreateRelationshipsForm = (
  props: CreateRelationshipsFormProps,
) => {
  const form = useForm<Required<CreateRelationshipsFormBody>>({
    resolver: zodResolver(vocabularyRelationshipCreate.required()),
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
