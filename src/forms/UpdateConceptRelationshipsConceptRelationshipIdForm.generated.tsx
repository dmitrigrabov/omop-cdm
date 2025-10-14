import { vocabularyConceptRelationshipCreate } from '@/types/vocabularyConceptRelationshipCreate.generated.ts'
import { useUpdateApiConceptRelationshipsConceptRelationshipId } from '@/services/useUpdateApiConceptRelationshipsConceptRelationshipId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateConceptRelationshipsConceptRelationshipIdFormBody = {
  relationship_id: string
  valid_start_date: string
  valid_end_date: string
  invalid_reason?: string | undefined
}

export type UpdateConceptRelationshipsConceptRelationshipIdFormProps = {
  concept_relationship_id: number
  defaultValues: UpdateConceptRelationshipsConceptRelationshipIdFormBody
  onSuccess: () => void
}

export type UpdateConceptRelationshipsConceptRelationshipIdFormPathParams = {
  concept_relationship_id: number
}

export const UpdateConceptRelationshipsConceptRelationshipIdForm = (
  props: UpdateConceptRelationshipsConceptRelationshipIdFormProps,
) => {
  const form = useForm<UpdateConceptRelationshipsConceptRelationshipIdFormBody>(
    {
      resolver: zodResolver(vocabularyConceptRelationshipCreate),
      defaultValues: props.defaultValues,
    },
  )

  const lens = useLens(form)

  const mutator = useUpdateApiConceptRelationshipsConceptRelationshipId()

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
