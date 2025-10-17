import { resultsFactRelationshipCreate } from '@/types/resultsFactRelationshipCreate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { useUpdateApiFactRelationshipsId } from '@/services/useUpdateApiFactRelationshipsId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateFactRelationshipsIdFormBody = {
  relationship_concept_id: number
}

export type UpdateFactRelationshipsIdFormProps = {
  id: string
  defaultValues: Required<UpdateFactRelationshipsIdFormBody>
  onSuccess: () => void
}

export type UpdateFactRelationshipsIdFormPathParams = { id: string }

export const UpdateFactRelationshipsIdForm = (
  props: UpdateFactRelationshipsIdFormProps,
) => {
  const form = useForm<Required<UpdateFactRelationshipsIdFormBody>>({
    resolver: zodResolver(resultsFactRelationshipCreate.required()),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiFactRelationshipsId()

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
        <IntegerField
          lens={lens.focus('relationship_concept_id')}
          label="relationship_concept_id"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
