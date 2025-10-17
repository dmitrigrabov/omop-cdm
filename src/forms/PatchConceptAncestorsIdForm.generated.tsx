import { vocabularyConceptAncestorUpdate } from '@/types/vocabularyConceptAncestorUpdate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { usePatchApiConceptAncestorsId } from '@/services/usePatchApiConceptAncestorsId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchConceptAncestorsIdFormBody = {
  ancestor_concept_id?: number | undefined
  descendant_concept_id?: number | undefined
  min_levels_of_separation?: number | undefined
  max_levels_of_separation?: number | undefined
}

export const PatchConceptAncestorsIdFormFields = () => {
  return (
    <>
      <IntegerField fieldName={`ancestor_concept_id`} />
      <IntegerField fieldName={`descendant_concept_id`} />
      <IntegerField fieldName={`min_levels_of_separation`} />
      <IntegerField fieldName={`max_levels_of_separation`} />
    </>
  )
}

export type PatchConceptAncestorsIdFormProps = {
  id: number
  defaultValues: PatchConceptAncestorsIdFormBody
  onSuccess: () => void
}

export type PatchConceptAncestorsIdFormPathParams = { id: number }

export const PatchConceptAncestorsIdForm = (
  props: PatchConceptAncestorsIdFormProps,
) => {
  const form = useForm<PatchConceptAncestorsIdFormBody>({
    resolver: zodResolver(vocabularyConceptAncestorUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiConceptAncestorsId()

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
        <PatchConceptAncestorsIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
