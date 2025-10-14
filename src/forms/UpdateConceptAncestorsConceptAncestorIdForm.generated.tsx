import { vocabularyConceptAncestorCreate } from '@/types/vocabularyConceptAncestorCreate.generated.ts'
import { useUpdateApiConceptAncestorsConceptAncestorId } from '@/services/useUpdateApiConceptAncestorsConceptAncestorId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateConceptAncestorsConceptAncestorIdFormBody = {
  ancestor_concept_id: number
  descendant_concept_id: number
  min_levels_of_separation: number
  max_levels_of_separation: number
}

export type UpdateConceptAncestorsConceptAncestorIdFormProps = {
  concept_ancestor_id: number
  defaultValues: UpdateConceptAncestorsConceptAncestorIdFormBody
  onSuccess: () => void
}

export type UpdateConceptAncestorsConceptAncestorIdFormPathParams = {
  concept_ancestor_id: number
}

export const UpdateConceptAncestorsConceptAncestorIdForm = (
  props: UpdateConceptAncestorsConceptAncestorIdFormProps,
) => {
  const form = useForm<UpdateConceptAncestorsConceptAncestorIdFormBody>({
    resolver: zodResolver(vocabularyConceptAncestorCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiConceptAncestorsConceptAncestorId()

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
