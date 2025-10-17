import { resultsFactRelationshipUpdate } from '@/types/resultsFactRelationshipUpdate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { usePatchApiFactRelationshipsId } from '@/services/usePatchApiFactRelationshipsId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchFactRelationshipsIdFormBody = {
  relationship_concept_id?: number | undefined
}

export type PatchFactRelationshipsIdFormProps = {
  id: string
  defaultValues: Required<PatchFactRelationshipsIdFormBody>
  onSuccess: () => void
}

export type PatchFactRelationshipsIdFormPathParams = { id: string }

export const PatchFactRelationshipsIdForm = (
  props: PatchFactRelationshipsIdFormProps,
) => {
  const form = useForm<Required<PatchFactRelationshipsIdFormBody>>({
    resolver: zodResolver(resultsFactRelationshipUpdate.required()),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiFactRelationshipsId()

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
