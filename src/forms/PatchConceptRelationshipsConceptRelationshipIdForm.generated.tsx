import { vocabularyConceptRelationshipUpdate } from '@/types/vocabularyConceptRelationshipUpdate.generated.ts'
import { StringField } from '@/components/fields/string-field'
import { usePatchApiConceptRelationshipsConceptRelationshipId } from '@/services/usePatchApiConceptRelationshipsConceptRelationshipId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchConceptRelationshipsConceptRelationshipIdFormBody = {
  relationship_id?: string | undefined
  valid_start_date?: string | undefined
  valid_end_date?: string | undefined
  invalid_reason?: string | undefined
}

export const PatchConceptRelationshipsConceptRelationshipIdFormFields = () => {
  return (
    <>
      <StringField fieldName={`relationship_id`} label="relationship_id" />
      <StringField fieldName={`valid_start_date`} label="valid_start_date" />
      <StringField fieldName={`valid_end_date`} label="valid_end_date" />
      <StringField fieldName={`invalid_reason`} label="invalid_reason" />
    </>
  )
}

export type PatchConceptRelationshipsConceptRelationshipIdFormProps = {
  concept_relationship_id: number
  defaultValues: PatchConceptRelationshipsConceptRelationshipIdFormBody
  onSuccess: () => void
}

export type PatchConceptRelationshipsConceptRelationshipIdFormPathParams = {
  concept_relationship_id: number
}

export const PatchConceptRelationshipsConceptRelationshipIdForm = (
  props: PatchConceptRelationshipsConceptRelationshipIdFormProps,
) => {
  const form = useForm<PatchConceptRelationshipsConceptRelationshipIdFormBody>({
    resolver: zodResolver(vocabularyConceptRelationshipUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiConceptRelationshipsConceptRelationshipId()

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
        <PatchConceptRelationshipsConceptRelationshipIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
