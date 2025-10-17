import { vocabularyConceptRelationshipCreate } from '@/types/vocabularyConceptRelationshipCreate.generated.ts'
import { StringField } from '@/components/fields/string-field'
import { useUpdateApiConceptRelationshipsId } from '@/services/useUpdateApiConceptRelationshipsId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateConceptRelationshipsIdFormBody = {
  relationship_id: string
  valid_start_date: string
  valid_end_date: string
  invalid_reason?: string | undefined
}

export type UpdateConceptRelationshipsIdFormProps = {
  id: string
  defaultValues: Required<UpdateConceptRelationshipsIdFormBody>
  onSuccess: () => void
}

export type UpdateConceptRelationshipsIdFormPathParams = { id: string }

export const UpdateConceptRelationshipsIdForm = (
  props: UpdateConceptRelationshipsIdFormProps,
) => {
  const form = useForm<Required<UpdateConceptRelationshipsIdFormBody>>({
    resolver: zodResolver(vocabularyConceptRelationshipCreate.required()),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiConceptRelationshipsId()

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
          lens={lens.focus('relationship_id')}
          label="relationship_id"
        />
        <StringField
          lens={lens.focus('valid_start_date')}
          label="valid_start_date"
        />
        <StringField
          lens={lens.focus('valid_end_date')}
          label="valid_end_date"
        />
        <StringField
          lens={lens.focus('invalid_reason')}
          label="invalid_reason"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
