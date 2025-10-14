import { resultsFactRelationshipUpdate } from '@/types/resultsFactRelationshipUpdate.generated.ts'
import { usePatchApiFactRelationshipsFactRelationshipId } from '@/services/usePatchApiFactRelationshipsFactRelationshipId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchFactRelationshipsFactRelationshipIdFormBody = {
  relationship_concept_id?: number | undefined
}

export type PatchFactRelationshipsFactRelationshipIdFormProps = {
  fact_relationship_id: number
  defaultValues: PatchFactRelationshipsFactRelationshipIdFormBody
  onSuccess: () => void
}

export type PatchFactRelationshipsFactRelationshipIdFormPathParams = {
  fact_relationship_id: number
}

export const PatchFactRelationshipsFactRelationshipIdForm = (
  props: PatchFactRelationshipsFactRelationshipIdFormProps,
) => {
  const form = useForm<PatchFactRelationshipsFactRelationshipIdFormBody>({
    resolver: zodResolver(resultsFactRelationshipUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiFactRelationshipsFactRelationshipId()

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
