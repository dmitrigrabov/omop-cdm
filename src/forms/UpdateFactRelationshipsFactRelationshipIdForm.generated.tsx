import { resultsFactRelationshipCreate } from '@/types/resultsFactRelationshipCreate.generated.ts'
import { useUpdateApiFactRelationshipsFactRelationshipId } from '@/services/useUpdateApiFactRelationshipsFactRelationshipId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateFactRelationshipsFactRelationshipIdFormBody = {
  relationship_concept_id: number
}

export type UpdateFactRelationshipsFactRelationshipIdFormProps = {
  fact_relationship_id: number
  defaultValues: UpdateFactRelationshipsFactRelationshipIdFormBody
  onSuccess: () => void
}

export type UpdateFactRelationshipsFactRelationshipIdFormPathParams = {
  fact_relationship_id: number
}

export const UpdateFactRelationshipsFactRelationshipIdForm = (
  props: UpdateFactRelationshipsFactRelationshipIdFormProps,
) => {
  const form = useForm<UpdateFactRelationshipsFactRelationshipIdFormBody>({
    resolver: zodResolver(resultsFactRelationshipCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiFactRelationshipsFactRelationshipId()

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
