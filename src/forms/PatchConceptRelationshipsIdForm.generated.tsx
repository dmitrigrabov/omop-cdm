import { vocabularyConceptRelationshipUpdate } from '@/types/vocabularyConceptRelationshipUpdate.generated.ts'
import { StringField } from '@/components/fields/string-field'
import { usePatchApiConceptRelationshipsId } from '@/services/usePatchApiConceptRelationshipsId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchConceptRelationshipsIdFormBody = {
  relationship_id?: string | undefined
  valid_start_date?: string | undefined
  valid_end_date?: string | undefined
  invalid_reason?: string | undefined
}

export type PatchConceptRelationshipsIdFormProps = {
  id: string
  defaultValues: Required<PatchConceptRelationshipsIdFormBody>
  onSuccess: () => void
}

export type PatchConceptRelationshipsIdFormPathParams = { id: string }

export const PatchConceptRelationshipsIdForm = (
  props: PatchConceptRelationshipsIdFormProps,
) => {
  const form = useForm<Required<PatchConceptRelationshipsIdFormBody>>({
    resolver: zodResolver(vocabularyConceptRelationshipUpdate.required()),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiConceptRelationshipsId()

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
